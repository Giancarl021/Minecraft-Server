FROM timbru31/java-node:alpine-jre

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --only=production

COPY . .

CMD [ "npm", "start" ]