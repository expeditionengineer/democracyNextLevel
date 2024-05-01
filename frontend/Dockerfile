# Pull base image
FROM node

# Set work directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project
COPY . .

# Build app
RUN npm run build
CMD ["npm", "start"]