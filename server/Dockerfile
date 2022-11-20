FROM node:14

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3200

# RUN npm run createAdmin

CMD ["npm", "start"]