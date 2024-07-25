FROM node as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src ./src

COPY .env ./

FROM node

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/.env ./

EXPOSE 3000
CMD ["node", "src/index.js"]

