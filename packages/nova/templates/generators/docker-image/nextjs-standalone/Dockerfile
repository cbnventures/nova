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
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/build/standalone ./
COPY --from=build --chown=node:node /app/build/static ./build/static
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["wget", "--spider", "--quiet", "http://127.0.0.1:3000/"]
USER node
CMD ["node", "server.js"]
