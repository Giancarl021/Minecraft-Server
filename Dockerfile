FROM alpine

WORKDIR /usr/app

COPY . .

RUN apk --no-cache --update add gcc make g++ zlib-dev python2 nodejs npm
RUN apk --no-cache --update add --repository=http://dl-cdn.alpinelinux.org/alpine/edge/testing openjdk16-jre

RUN npm install --only=production

EXPOSE 80 25565

CMD [ "npm", "start" ]