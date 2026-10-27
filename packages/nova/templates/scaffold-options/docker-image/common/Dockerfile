# syntax=docker/dockerfile:1

##################################
#### Step 1: Build Workspaces ####
##################################
FROM node:[__SCAFFOLD_VERSION_DOCKER_NODE__] AS build
WORKDIR /workspace
COPY packages/docker/build-package.json ./package.json
COPY packages/docker/pnpm-workspace.yaml ./pnpm-workspace.yaml
[__DOCKER_PACKAGE_MANAGER_CONFIG_COPIES__]
[__DOCKER_WORKSPACE_MANIFEST_COPIES__]
[__DOCKER_INSTALL_COMMAND__]
COPY nova.config.json ./nova.config.json
[__DOCKER_WORKSPACE_SOURCE_COPIES__]
[__DOCKER_WORKSPACE_MANIFEST_RESTORES__]
[__DOCKER_BUILD_COMMANDS__]
[__DOCKER_PRUNE_COMMAND__]
[__DOCKER_RUNTIME_ASSEMBLY__]

####################################
#### Step 2: Install s6-overlay ####
####################################
FROM debian:[__SCAFFOLD_VERSION_DOCKER_DEBIAN__] AS s6-overlay
ARG DEBIAN_FRONTEND="noninteractive"
ARG TARGETARCH
ARG S6_OVERLAY_VERSION="[__SCAFFOLD_VERSION_DOCKER_S6_OVERLAY__]"
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    xz-utils \
  && rm -rf /var/lib/apt/lists/*
RUN set -eux; \
  case "${TARGETARCH}" in \
    "amd64") s6_architecture="x86_64" ;; \
    "arm64") s6_architecture="aarch64" ;; \
    *) echo "Unsupported target architecture: ${TARGETARCH}" >&2; exit 1 ;; \
  esac; \
  mkdir -p /s6-rootfs; \
  for archive_name in "s6-overlay-noarch.tar.xz" "s6-overlay-${s6_architecture}.tar.xz"; do \
    release_url="https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}"; \
    curl --fail --location --silent --show-error \
      --output "/tmp/${archive_name}" \
      "${release_url}/${archive_name}"; \
    curl --fail --location --silent --show-error \
      --output "/tmp/${archive_name}.sha256" \
      "${release_url}/${archive_name}.sha256"; \
    cd /tmp; \
    sha256sum -c "${archive_name}.sha256"; \
    tar -C /s6-rootfs -Jxpf "/tmp/${archive_name}"; \
    rm -f "/tmp/${archive_name}" "/tmp/${archive_name}.sha256"; \
  done

###############################
#### Step 3: Runtime Image ####
###############################
FROM [__DOCKER_RUNTIME_BASE__] AS runtime
ARG DEBIAN_FRONTEND="noninteractive"
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    tzdata \
    wget \
  && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production \
  PGID=1000 \
  PUID=1000 \
  TZ=UTC
WORKDIR /app
COPY --from=s6-overlay /s6-rootfs/ /
COPY packages/docker/rootfs/ /
RUN find /usr/local/libexec/nova-docker -type f -exec sed -i 's/\r$//' {} \; \
  && find /usr/local/libexec/nova-docker -type f -exec chmod 0755 {} \; \
  && find /etc/s6-overlay/s6-rc.d -type f \( -name run -o -name finish \) -exec sed -i 's/\r$//' {} \; \
  && find /etc/s6-overlay/s6-rc.d -type f \( -name run -o -name finish \) -exec chmod 0755 {} \;
[__DOCKER_RUNTIME_COPIES__]
[__DOCKER_WRITABLE_DIRECTORIES__]
[__DOCKER_EXPOSE_DIRECTIVES__]
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["/usr/local/libexec/nova-docker/healthcheck"]
STOPSIGNAL SIGTERM
ENTRYPOINT ["/init"]
