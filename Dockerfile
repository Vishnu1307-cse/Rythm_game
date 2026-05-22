# Step 1: Use Node.js
FROM node:20

# Step 2: Create app folder inside container
WORKDIR /app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy all project files
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Install a simple server
RUN npm install -g serve

# Step 8: Expose port
EXPOSE 4173

# Step 9: Start app
CMD ["serve", "-s", "dist", "-l", "4173"]