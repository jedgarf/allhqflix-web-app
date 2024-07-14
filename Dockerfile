# Use the official Node.js image to build and serve the React app
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN yarn run build

# Install `serve` to serve the static files
RUN yarn global add serve

# Expose port 4001 to the outside world
EXPOSE 4001

# Command to serve the React app
CMD ["serve", "-s", "build", "-l", "4001"]