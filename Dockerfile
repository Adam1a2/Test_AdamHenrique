FROM node:lts-alpine

WORKDIR /usr/app

COPY package.json yarn.* ./

RUN yarn

EXPOSE 3333

CMD ["yarn", "dev"];