FROM node:6.10.3

# Create app directory
RUN mkdir -p /src/app
WORKDIR /src/app

# to make npm test run only once non-interactively
ENV CI=true

# Install app dependencies
COPY package.json /src/app/
RUN npm install && \
    npm install -g serve

# Bundle app source
COPY ./build /src/app

# Build and optimize react app
#RUN npm run build --unsafe-perm

#RUN serve -s build

EXPOSE 5000

# defined in package.json
CMD [ "serve", "-s", "."]