FROM node:10.20.1

# set working directory
WORKDIR /usr/src/app


# install and cache app dependencies
COPY package*.json ./
RUN npm install

COPY ./src .
EXPOSE 5000
CMD ["npm", "start"]