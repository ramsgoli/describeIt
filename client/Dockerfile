# lightweight base image
FROM alpine:3.5

# install nginx
RUN apk update && apk add nginx make nodejs

RUN mkdir -p /var/www/describeit/working && \
    mkdir -p /var/www/describeit/static && \
    mkdir -p /var/www/describeit/static/build

WORKDIR /var/www/describeit/working
COPY *.json /var/www/describeit/working/
RUN /usr/bin/node --max_semi_space_size=8 \
                  --max_old_space_size=298 \
                  --max_executable_size=248 \
                  /usr/bin/npm install

# copy source files
COPY pages/ /var/www/describeit/working/pages/
COPY src/ /var/www/describeit/working/src/
COPY .babelrc *.js Makefile /var/www/describeit/working/

RUN npm run build && \
    cp -rv pages/* ../static/ && \
    cp -rv lib/build/* ../static/build/

RUN mkdir -p /run/nginx
COPY nginx.conf /etc/nginx/
WORKDIR /var/www/describeit/static

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
