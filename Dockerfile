FROM node:8.2-slim

WORKDIR /usr/src/gnindex-front
COPY src ./src
COPY .angular-cli.json .babelrc \
      graphql.config.json graphql.schema.json \
      package.json tsconfig.json tslint.json ./

RUN npm install -g @angular/cli@latest
RUN npm install

EXPOSE 3000
CMD [ "ng", "serve", \
        "--host", "0.0.0.0", \
        "--port", "3000", \
        "--prod", \
        "--disable-host-check" ]
