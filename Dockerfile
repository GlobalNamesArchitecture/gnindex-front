FROM nginx:1.13

COPY conf/main.nginx /etc/nginx/nginx.conf
COPY conf/sites-enabled/ /etc/nginx/sites-enabled/

WORKDIR /opt/app/
COPY app/dist/ .
COPY graphiql/build/ ./graphiql
