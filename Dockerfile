FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm i

COPY . .

ENV PORT=3001
EXPOSE 80

RUN pnpm run build
CMD [ "pnpm", "start" ]