FROM node:14

# Create app directory, full path of the project
WORKDIR /Users/o.karademirci/Documents/VoteRookie/vrn-api/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "src/server.js" ]