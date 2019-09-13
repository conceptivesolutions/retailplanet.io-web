FROM node:11.14.0-alpine

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

# Install gulp
RUN npm install --global gulp gulp-cli

COPY pages /home/data/pages
COPY src /home/data/src
COPY static /home/data/static
COPY gulpfile.js /home/data/
COPY next.config.js /home/data/
COPY package.json /home/data/
COPY package-lock.json /home/data/
COPY server.js /home/data/
COPY server_auth.js /home/data/

RUN cd /home/data && npm ci && \
    npm link gulp gulp-sass && gulp && \
    npm run build

EXPOSE 3000
WORKDIR /home/data

ENTRYPOINT ["npm", "start"]
