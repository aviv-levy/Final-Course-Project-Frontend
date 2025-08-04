# Stage 1: Build Stage - Building the application
FROM node:19 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package files for better caching
COPY package*.json ./

# Install project dependencies
RUN npm install

COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime Stage - Running the application
FROM node:19-alpine

# Set the working directory inside the container
WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy the built application and .env from the builder stage
COPY --from=builder /app/build ./build

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "build", "-l", "3000"]