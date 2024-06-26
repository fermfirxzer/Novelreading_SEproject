# base image
FROM node:21-alpine

# set working directory
WORKDIR /app
# add `/usr/src/app/node_modules/.bin` to $PATH
COPY . .

RUN npm install
EXPOSE 3000

CMD ["npm","start"]

