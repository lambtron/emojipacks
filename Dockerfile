FROM node:6-alpine

RUN mkdir -p /src/emojipacks

WORKDIR /src/emojipacks

ADD . /src/emojipacks/  

RUN npm link

ENTRYPOINT ["emojipacks"]
