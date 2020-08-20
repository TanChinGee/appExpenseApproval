FROM alpine
EXPOSE 8080
RUN apk update
RUN apk add mysql
RUN apk add nodejs
COPY app/start.sh /tmp/start.sh
USER 1000
CMD ["sh","/tmp/start.sh"]