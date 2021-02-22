FROM node:latest


ENV PORT=3000
ENV HOST=0.0.0.0
ENV REACT_EDITOR=atom
WORKDIR /usr/src/app
ADD package.json .
# ADD ./src/assets /usr/src/app/src/assets
RUN npm install 
    # npm i --global node-sass &&\
    # npm run compile-sass
EXPOSE 3000
