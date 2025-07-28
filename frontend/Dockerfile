# Use official Node.js image
FROM node:24-slim

# Set working directory
WORKDIR /src

# Copy package files and install dependencies
COPY package*.json ./
COPY .env .
RUN npm install

# Copy rest of the source code
COPY . .

# Expose Vite dev port
EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev"]