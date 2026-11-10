set -eu

release_directory="__RELEASE_DIRECTORY__"
share_directory="__STAGED_SHARE_DIRECTORY__"

# Prints the key lines of a release-signing.pub file. Blank lines and "#"
# comments are skipped, the same way the installed package reads the file.
read_key_lines() {
  tr -d '\r' < "$1" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' | grep -v -e '^$' -e '^#' || true
}

package_count=0

for package_file in "${release_directory}"/*.pkg; do
  if [ -f "$package_file" ]; then
    package_count=$((package_count + 1))
  fi
done

if [ "$package_count" -eq 0 ]; then
  echo "::error::No .pkg files were found in ${release_directory}."
  exit 1
fi

if [ -z "${RELEASE_SIGNING_KEY:-}" ]; then
  echo "::notice::The release signing secret is not set, so the release packages are not signed."
  exit 0
fi

umask 077
key_directory="$(mktemp -d "${RUNNER_TEMP:-/tmp}/release-signing.XXXXXX")"
trap 'rm -rf "$key_directory"' EXIT
printf '%s\n' "$RELEASE_SIGNING_KEY" | tr -d '\r' > "${key_directory}/signing-key"

if ! ssh-keygen -y -P '' -f "${key_directory}/signing-key" > "${key_directory}/signing-key.pub" 2> /dev/null; then
  echo "::error::The release signing secret must be an unencrypted OpenSSH private key that starts with \"-----BEGIN OPENSSH PRIVATE KEY-----\"."
  exit 1
fi

for package_file in "${release_directory}"/*.pkg; do
  package_name="$(basename "$package_file" .pkg)"

  # Versioned files end in -<version>; a stable copy such as pfSense-pkg-Demo.pkg
  # already is the package name, so only a suffix that starts with a digit is removed.
  case "${package_name##*-}" in
    [0-9]*) package_name="${package_name%-*}" ;;
  esac

  public_key_file="${share_directory}/${package_name}/release-signing.pub"

  rm -f "${package_file}.sig"
  ssh-keygen -Y sign -f "${key_directory}/signing-key" -n "$package_name" "$package_file"

  key_lines=""

  if [ -f "$public_key_file" ]; then
    key_lines="$(read_key_lines "$public_key_file")"
  fi

  if [ -z "$key_lines" ]; then
    echo "::warning::${package_name} lists no key in release-signing.pub, so installed copies won't check this signature."
    continue
  fi

  : > "${key_directory}/allowed_signers"

  while IFS= read -r key_line; do
    if ! printf '%s\n' "$key_line" | grep -Eq '^ssh-ed25519[[:space:]]+AAAAC3NzaC1lZDI1NTE5AAAAI[A-Za-z0-9+/]{43}([[:space:]].*)?$'; then
      echo "::error::${public_key_file} has a line that isn't an \"ssh-ed25519\" public key."
      exit 1
    fi

    key_data="$(printf '%s\n' "$key_line" | awk '{ print $2 }')"
    printf '%s namespaces="%s" ssh-ed25519 %s\n' "$package_name" "$package_name" "$key_data" >> "${key_directory}/allowed_signers"
  done <<KEY_LINES
${key_lines}
KEY_LINES

  if ! ssh-keygen -Y verify -f "${key_directory}/allowed_signers" -I "$package_name" -n "$package_name" -s "${package_file}.sig" < "$package_file"; then
    echo "::error::The release signing secret doesn't match a key in ${public_key_file}."
    exit 1
  fi
done
