FROM node:10-alpine

RUN mkdir -p /home/api/node_modules && chown -R node:node /home/api
ADD . /home/api
#RUN chmod 777 -R /home/api
WORKDIR /home/api

# COPY package*.json ./

USER node
RUN rm -rf package-lock.json node_modules
RUN npm install
WORKDIR /home/api/src/database
# RUN alias seq='../../node_modules/.bin/sequelize'
# RUN ../../node_modules/.bin/sequelize db:migrate
COPY --chown=node:node . .

EXPOSE 8080
