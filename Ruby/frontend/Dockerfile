FROM docker.io/library/node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install vite@latest -g

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
