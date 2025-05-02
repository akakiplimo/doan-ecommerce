# Build stage
FROM node:23-alpine

# Install pnpm globally
RUN npm config set registry https://registry.npmmirror.com
RUN npm --loglevel verbose install -g pnpm

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build


# Production stage
FROM nginx:alpine

# Copy build files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]