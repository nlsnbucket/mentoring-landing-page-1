FROM node:alpine
WORKDIR /app

COPY . .

RUN yarn
RUN npx tsc

CMD ["node", "dist/index.js"]

EXPOSE 3000