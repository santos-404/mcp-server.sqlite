FROM node:22.12 AS builder

RUN apt-get update && apt-get install -y libsqlite3-dev

# Sorry for installing pnpm. I've tried to do it w npm but couldn't
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

ENV npm_config_build_from_source=true
ENV npm_config_sqlite=/usr

RUN pnpm install --ignore-scripts
# sqlite3 package was being failing to be installed. I have to rebuilt it here
RUN cd node_modules/sqlite3 && pnpm rebuild

COPY . .
RUN pnpm run build

FROM node:22.12 AS release

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

ENTRYPOINT ["node", "dist/index.js"]
