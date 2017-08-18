FROM node:8.2.0-alpine

RUN mkdir -p /describeIt
WORKDIR /describeIt

COPY package.json package-lock.json /describeIt/
RUN npm install  --quiet

COPY . /describeIt 


