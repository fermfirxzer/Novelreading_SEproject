# base image
FROM node:21-alpine

# set working directory
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
COPY . .
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

CMD ["npm","start"," "]

EXPOSE 3000
EXPOSE 5000
