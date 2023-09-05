FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN apk add git make g++ alpine-sdk python3 py3-pip unzip
RUN npm i -g pnpm
RUN pnpm install
RUN npm run build

FROM node:20-alpine
RUN apk add zip unzip bash --no-cache
WORKDIR /app
COPY --from=builder /app/dist dist

ENV NODE_ENV=production
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY .npmrc ./
COPY prisma ./prisma/
COPY external ./external/

RUN npm i -g pnpm
RUN pnpm i --prod

COPY --from=builder ./node_modules/.prisma ./node_modules/.prisma 
ENV TZ=Asia/Shanghai
EXPOSE 3333

CMD ["npm", "start:prod"]
