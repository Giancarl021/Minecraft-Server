FROM alpine:latest

WORKDIR /usr/app

RUN apk --no-cache --update add gcc make g++ zlib-dev python2 nodejs npm
RUN apk --no-cache --update --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community add openjdk17-jre

COPY . .

RUN npm install --only=production

EXPOSE 80 25565

CMD [ "npm", "start" ]