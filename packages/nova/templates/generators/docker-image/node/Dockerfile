############################
#### Step 1: Build Image ####
############################
FROM node:24.21.0-alpine3.23 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build

##############################
#### Step 2: Runtime Image ####
##############################
FROM node:24.21.0-alpine3.23 AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev \
  && npm cache clean --force
COPY --from=build --chown=node:node /app/build ./build
[__DOCKER_RUNTIME_DIRECTIVES__]
USER node
CMD ["node", "build/index.js"]
