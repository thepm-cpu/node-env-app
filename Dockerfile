# Use official Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
