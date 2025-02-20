FROM node:20-alpine as install

# Set current user to node
USER node

# Set work directory to the project root directory
WORKDIR /home/node/workflow

# Copy all application files to the container
COPY --chown=node:node . .

# Install npm dependencies
RUN npm install

FROM install as dev

# Serve application for development
ENTRYPOINT ["npm", "run", "dev"]

FROM install as build

# Build application for production with minification
RUN npm run build

FROM node:20-alpine as prod

# Set work directory to the project root directory
WORKDIR /home/node/workflow

# Set necessary environment variables for npm global
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Install server to serve application
RUN npm install -g serve

# Copy built application
COPY --from=build /home/node/workflow/dist dist

# Serve application for production
ENTRYPOINT ["serve", "dist", "-s", "-p", "5173"]
