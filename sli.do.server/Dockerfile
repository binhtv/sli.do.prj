FROM node:6.10.3

# Create app directory
RUN mkdir -p /src/app
WORKDIR /src/app

# to make npm test run only once non-interactively
ENV CI=true

# Install app dependencies
COPY package.json /src/app/
RUN npm install -g sails
RUN npm install

# Bundle app source
COPY . /src/app

# Build and optimize react app
#RUN npm run build --unsafe-perm

EXPOSE 1337

# defined in package.json
CMD [ "sails", "lift", "--prod"]