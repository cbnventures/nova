#######################
#### Runtime Image ####
#######################
FROM alpine:[__SCAFFOLD_VERSION_DOCKER_ALPINE__] AS runtime
RUN addgroup -S app \
  && adduser -S -G app app
WORKDIR /app
COPY --chown=app:app . .
USER app
CMD ["/bin/sh"]
