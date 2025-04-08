FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

# Declare a build argument for SECRET_OPENAIKEY
ARG OPENAI_API_KEY

# Set the environment variable inside the container
ENV OPENAI_API_KEY=${OPENAI_API_KEY}

EXPOSE 3000
ENV NODE_ENV=production

CMD [ "node", "build" ]

