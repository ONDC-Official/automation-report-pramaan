# Stage 2: Setup the backend
FROM node:16-alpine
WORKDIR /app
ARG ENV_FILE
ARG FOLDER

COPY . .

# COPY ./package*.json ./
# COPY ./tsconfig.json ./
RUN npm install

COPY ${ENV_FILE} ./.env

# Copy from the previous stage
CMD ["node", "-r", "module-alias/register", "src/server.js"]

# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
#   CMD wget --quiet --tries=1 --spider http://localhost:3005/health || exit 1
