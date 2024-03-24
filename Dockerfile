# Node latest LTS 20.11.1 with alpine
# (a lightweight distribution)
FROM node:20.11.1-alpine
LABEL maintainer="ClemLcs. <https://github.com/ClemLcs>"

# add some required packages
RUN apk update && apk upgrade && \
    apk add --no-cache bash git python3 make g++

# creates a directory for the app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install the app
COPY package*.json ./
RUN npm install

# bundle all source code
COPY . .

RUN npm run dev