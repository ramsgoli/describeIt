FROM node:8.2.0-alpine

RUN mkdir -p /describeIt
WORKDIR /describeIt

COPY *.json /describeIt/
RUN npm install  --quiet

COPY . /describeIt 


