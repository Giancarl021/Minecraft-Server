FROM timbru31/java-node:alpine-jre

WORKDIR /usr/app

COPY . .

RUN npm install --only=production

RUN npm run knex:build

EXPOSE 80 25565

CMD [ "npm", "start" ]