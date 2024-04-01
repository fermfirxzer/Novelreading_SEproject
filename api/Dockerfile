# base image
FROM node:alpine

# set working directory
WORKDIR /app
# add `/usr/src/app/node_modules/.bin` to $PATH
COPY . .

RUN npm install
EXPOSE 5000

CMD ["npm","start"]

