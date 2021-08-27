FROM node:14-alpine as base

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

FROM base as production

RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "start:node"]