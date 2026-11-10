set -eu

staged_share_directory="__STAGED_SHARE_DIRECTORY__"

if [ -z "${RELEASE_SIGNING_KEY:-}" ]; then
  echo "::notice::The release signing secret is not set, so the package ships without a release signing key."
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

public_key="$(awk '{ print $1 " " $2 }' "${key_directory}/signing-key.pub")"

case "$public_key" in
  "ssh-ed25519 "*)
    ;;
  *)
    echo "::error::The release signing secret must be an Ed25519 key."
    exit 1
    ;;
esac

key_file_count=0

for public_key_file in "${staged_share_directory}"/*/release-signing.pub; do
  if [ ! -f "$public_key_file" ]; then
    continue
  fi

  key_file_count=$((key_file_count + 1))

  if [ -s "$public_key_file" ] && [ -n "$(tail -c 1 "$public_key_file")" ]; then
    printf '\n' >> "$public_key_file"
  fi

  if ! tr -d '\r' < "$public_key_file" | awk '{ print $1 " " $2 }' | grep -Fxq "$public_key"; then
    printf '%s added by the publish workflow\n' "$public_key" >> "$public_key_file"
  fi
done

if [ "$key_file_count" -eq 0 ]; then
  echo "::warning::The staged port has no usr/local/share/<package>/release-signing.pub file, so installed copies won't check release signatures."
fi
