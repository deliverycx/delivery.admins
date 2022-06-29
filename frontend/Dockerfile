FROM node:alpine

RUN mkdir -p /etc/app/cx
ENV PORT 6000

WORKDIR /etc/app/cx

COPY package.json /etc/app/cx
COPY yarn.lock /etc/app/cx

RUN npm i

COPY . /etc/app/cx

RUN npm run build

EXPOSE 6000
CMD [ "yarn", "start" ]
