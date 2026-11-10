#!/bin/bash
# Runs add-signing-key.sh then sign-release.sh the way the publish job does, against throwaway keys.
set -u
S="$1"; SH="${2:-bash}"
W="$(mktemp -d "${TMPDIR:-/tmp}/signpipe.XXXXXX")"; trap 'rm -rf "$W"' EXIT
N=pfSense-pkg-Demo; mkdir -p "$W/keys" "$W/runner"
ssh-keygen -q -t ed25519 -N '' -C 'old key A' -f "$W/keys/a"; ssh-keygen -q -t ed25519 -N '' -C 'new key B' -f "$W/keys/b"; ssh-keygen -q -t rsa -b 2048 -N '' -C 'rsa' -f "$W/keys/rsa"
COMMENTS='# Release signing keys for pfSense-pkg-Demo.\n#\n# The publish workflow adds its signing key here.\n'
pass=0; fail=0
case_run() { # label want_add want_sign repo_file_content(- = none) secret_file(empty=none) [check]
  local label="$1" want_a="$2" want_b="$3" content="$4" secret="$5" check="${6:-}"
  local R="$W/c"; rm -rf "$R"; mkdir -p "$R/port/share/$N" "$R/build/port/share" "$R/build/release"
  [ "$content" != "-" ] && printf '%b' "$content" > "$R/port/share/$N/release-signing.pub"
  cp -R "$R/port/share/." "$R/build/port/share/"   # stage-package copies the port
  sed "s|__STAGED_SHARE_DIRECTORY__|$R/build/port/share|" "$S/signing/add-signing-key.sh" > "$R/a.sh"
  sed -e "s|__RELEASE_DIRECTORY__|$R/build/release|" -e "s|__STAGED_SHARE_DIRECTORY__|$R/build/port/share|" "$S/signing/sign-release.sh" > "$R/b.sh"
  local key=""; [ -n "$secret" ] && key="$(cat "$secret")"
  local out_a out_b code_a code_b=skip
  out_a="$(RELEASE_SIGNING_KEY="$key" RUNNER_TEMP="$W/runner" "$SH" "$R/a.sh" 2>&1)"; code_a=$?
  if [ "$code_a" = 0 ]; then
    printf 'pkg %s\n' "$label" > "$R/build/release/$N-1.2.3.pkg"   # the FreeBSD build
    cp "$R/build/release/$N-1.2.3.pkg" "$R/build/release/$N.pkg"      # build-package.sh's stable copy
    out_b="$(RELEASE_SIGNING_KEY="$key" RUNNER_TEMP="$W/runner" "$SH" "$R/b.sh" 2>&1)"; code_b=$?
  fi
  local ok=1; [ "$code_a" = "$want_a" ] || ok=0; [ "$code_b" = "$want_b" ] || ok=0; [ -z "$(ls -A "$W/runner")" ] || { ok=0; echo "  LEFTOVER"; }
  if [ "$check" = "verify-staged" ]; then
    grep -v '^#' "$R/build/port/share/$N/release-signing.pub" | awk 'NF{print "'$N' namespaces=\"'$N'\" "$1" "$2}' > "$W/allowed"
    ssh-keygen -Y verify -f "$W/allowed" -I $N -n $N -s "$R/build/release/$N-1.2.3.pkg.sig" < "$R/build/release/$N-1.2.3.pkg" >/dev/null 2>&1 || { ok=0; echo "  installed-copy verify FAILED"; }
    ssh-keygen -Y verify -f "$W/allowed" -I $N -n $N -s "$R/build/release/$N.pkg.sig" < "$R/build/release/$N.pkg" >/dev/null 2>&1 || { ok=0; echo "  stable-copy verify FAILED"; }
    cmp -s "$R/port/share/$N/release-signing.pub" "$R/build/port/share/$N/release-signing.pub" && { ok=0; echo "  staged file unchanged"; }
    [ "$(grep -c '^ssh-ed25519' "$R/build/port/share/$N/release-signing.pub")" = "${7:-1}" ] || { ok=0; echo "  key line count $(grep -c '^ssh-ed25519' "$R/build/port/share/$N/release-signing.pub") want ${7:-1}"; }
  fi
  [ "$check" = "repo-untouched" ] && { cmp -s "$R/port/share/$N/release-signing.pub" "$R/build/port/share/$N/release-signing.pub" || { ok=0; echo "  staged file changed"; }; }
  if [ $ok = 1 ]; then pass=$((pass+1)); r=PASS; else fail=$((fail+1)); r=FAIL; fi
  printf '%s  %-52s add=%s sign=%s\n' "$r" "$label" "$code_a" "$code_b"
  printf '%s\n%s\n' "$out_a" "${out_b:-}" | grep -E '::(error|warning|notice)::' | sed 's/^/        /' | head -2
}
PUB_A="$(awk '{print $1" "$2}' "$W/keys/a.pub")"; PUB_B="$(awk '{print $1" "$2" new key"}' "$W/keys/b.pub")"
printf 'NOVA_PLACEHOLDER' > "$W/keys/placeholder"
case_run "no secret, comment-only file"                 0 0 "$COMMENTS" "" repo-untouched
case_run "no secret, file lists a rotation key"         0 0 "$COMMENTS$PUB_B\n" ""
case_run "secret set, comment-only file"                0 0 "$COMMENTS" "$W/keys/a" verify-staged 1
case_run "secret set, file without trailing newline"    0 0 "# only a comment" "$W/keys/a" verify-staged 1
case_run "secret set, key already listed (no dup)"      0 0 "$COMMENTS$PUB_A\n" "$W/keys/a" repo-untouched
case_run "rotation: file lists new B, secret is old A"  0 0 "$COMMENTS$PUB_B\n" "$W/keys/a" verify-staged 2
case_run "secret is NOVA_PLACEHOLDER"                   1 skip "$COMMENTS" "$W/keys/placeholder"
case_run "secret is an RSA key"                         1 skip "$COMMENTS" "$W/keys/rsa"
case_run "secret set, package has no key file"          0 0 "-" "$W/keys/a"
case_run "secret set, malformed line in file"           0 1 "$COMMENTS""ssh-rsa AAAAB3 bad\n" "$W/keys/a"
echo "RESULT ($SH): $pass passed, $fail failed"
