FROM node:lts as dependencies
WORKDIR /Demo-4
COPY package.json ./
RUN npm install

FROM node:lts as builder
WORKDIR /Demo-4
COPY . .
COPY --from=dependencies /Demo-4/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /Demo-4
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /Demo-4/next.config.js ./
COPY --from=builder /Demo-4/public ./public
COPY --from=builder /Demo-4/.next ./.next
COPY --from=builder /Demo-4/node_modules ./node_modules
COPY --from=builder /Demo-4/package.json ./package.json
COPY --from=builder /Demo-4/pages ./pages

EXPOSE 3000

CMD "npm" "run" "start"
