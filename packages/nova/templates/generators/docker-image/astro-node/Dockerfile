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
FROM node:24.21.0-alpine3.23 AS runtime
ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV PORT=4321
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev \
  && npm cache clean --force
COPY --from=build --chown=node:node /app/build ./build
EXPOSE 4321
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["wget", "--spider", "--quiet", "http://127.0.0.1:4321/"]
USER node
CMD ["node", "build/server/entry.mjs"]
