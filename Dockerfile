FROM timbru31/java-node:alpine-jre

WORKDIR /usr/app

COPY . .

RUN npm install --only=production

ENV ADMIN_USERNAME="admin"
ENV ADMIN_PASSWORD="changeme"

RUN npm run knex:build

EXPOSE 80 25565

CMD [ "npm", "start" ]