FROM oven/bun:1.1.34-alpine AS base
WORKDIR /usr/src/api

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
#RUN bun test
#RUN bun run build
RUN bun --bun knex migrate:latest

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/api/src src
COPY --from=prerelease /usr/src/api/package.json .

USER bun
EXPOSE 8000/tcp
ENTRYPOINT [ "bun", "run", "./src/index.ts" ]