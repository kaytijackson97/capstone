FROM mysql:latest

COPY *.sql /docker-entrypoint-initdb.d/

ENV MYSQL_ROOT_PASSWORD=Password!
ENV MYSQL_DATABASE=plantbase
