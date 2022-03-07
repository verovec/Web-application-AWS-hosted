FROM node:12-alpine3.11

WORKDIR /usr/app

ENV PATH /usr/app/node_modules/.bin:$PATH

COPY . ./

EXPOSE 8080

ENTRYPOINT [ "./entrypoint.sh" ]
