FROM node:18-alpine3.14

WORKDIR /app
COPY . .

RUN npm install -g pnpm
RUN pnpm install --production
RUN pnpm build

EXPOSE 3000

CMD [ "pnpm", "start" ]