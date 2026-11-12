FROM node:22-slim
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ .
COPY client/ ../client/
ENV PORT=3000
CMD ["node", "index.js"]