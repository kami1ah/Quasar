FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY server/ ./server/
COPY client/ ./client/
ENV PORT=3000
CMD ["node", "index.js"]
