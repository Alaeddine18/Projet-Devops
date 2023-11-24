# Use an official Node.js runtime as a base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local code to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run your app (adjust as needed)
CMD ["node", "index.js"]
