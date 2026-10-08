#######################
#### Runtime Image ####
#######################
FROM alpine:3.23.3 AS runtime
RUN addgroup -S app \
  && adduser -S -G app app
WORKDIR /app
COPY --chown=app:app . .
USER app
CMD ["/bin/sh"]
