FROM node:12-alpine3.11

WORKDIR /usr/app

ENV PATH /usr/app/node_modules/.bin:$PATH

COPY . ./

RUN npm install

ENTRYPOINT [ "./entrypoint.sh" ]
