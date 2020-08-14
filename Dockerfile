FROM timbru31/java-node:alpine-jre

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --only=production

COPY . .

EXPOSE 3000 25565

CMD [ "npm", "start" ]