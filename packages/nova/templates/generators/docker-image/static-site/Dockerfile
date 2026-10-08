############################
#### Step 1: Build Image ####
############################
FROM node:24.21.0-alpine3.23 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

##############################
#### Step 2: Runtime Image ####
##############################
FROM nginxinc/nginx-unprivileged:1.30.5-alpine3.24 AS runtime
COPY --from=build --chown=nginx:nginx /app/[__DOCKER_BUILD_DIRECTORY__] /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["wget", "--spider", "--quiet", "http://127.0.0.1:8080/"]
