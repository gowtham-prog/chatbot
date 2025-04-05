FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

# Production stage
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json yarn.lock ./

# Install PRODUCTION dependencies (now includes vite)
RUN yarn --production

EXPOSE 3000
CMD ["yarn", "vite", "preview", "--port", "3000", "--host", "0.0.0.0"]