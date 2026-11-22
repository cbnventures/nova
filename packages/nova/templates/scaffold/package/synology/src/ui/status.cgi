#!/bin/sh

set -eu

status_file=/var/packages/[__WORKSPACE_PACKAGE_NAME__]/var/status.json

# DSM runs package CGIs as the package user; "authenticate.cgi" prints the signed-in DSM user, or nothing.
user=$(/usr/syno/synoman/webman/modules/authenticate.cgi 2> /dev/null || true)

if [ -z "${user}" ]; then
  printf 'Status: 401 Unauthorized\r\nContent-Type: application/json\r\n\r\n%s\n' '{"error":"Sign in to DSM first."}'
  exit 0
fi

printf 'Content-Type: application/json\r\nCache-Control: no-store\r\n\r\n'

if [ ! -f "${status_file}" ]; then
  printf '%s\n' '{"state":"stopped","pid":0,"started":"","greeting":""}'
  exit 0
fi

service_pid=$(sed -n 's/.*"pid":\([0-9]*\).*/\1/p' "${status_file}")

# A service that exited on its own still has "running" in the file, so confirm its process is alive.
if grep -q '"state":"running"' "${status_file}" && ! kill -0 "${service_pid:-0}" 2> /dev/null; then
  sed -e 's/"state":"running"/"state":"stopped"/' -e 's/"pid":[0-9]*/"pid":0/' -e 's/"started":"[^"]*"/"started":""/' "${status_file}"
  exit 0
fi

cat "${status_file}"

exit 0
