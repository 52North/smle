FROM nginx:1.11
MAINTAINER Jan Schulte <j.schulte@52north.org>

# Project: https://github.com/52North/smle

## Install required dependencies, including late Node.js
RUN apt-get update \
    && apt-get install -y --no-install-recommends --fix-missing \
    #ca-certificates \
    build-essential \
	  unzip \
    bzip2 \
    git \
    curl

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - \
	  && apt-get install -y \
    nodejs \
    && rm -rf /var/lib/apt/lists/*

ENV BRANCH sos-connect

# Download sources, build, copy build to install loation, remove temp files
# Cannot simply run "npm install" because I'm root (need --allow-root for bower, and maybe --unsafe-perm for npm install), so instead run bower install  manually as well; then run grunt to get the distribution package in ./dist
WORKDIR /tmp
RUN curl -LO https://github.com/janschulte/smle/archive/$BRANCH.zip && unzip $BRANCH.zip

COPY webpack.prod.config.js smle-$BRANCH/

WORKDIR /tmp/smle-$BRANCH
RUN npm install && npm install

RUN npm run typings-install

RUN npm run build:prod \
    && cp -r dist/* /usr/share/nginx/html/ \
    && cd .. \
    && rm -r smle-$BRANCH \
    && rm -r $BRANCH.zip

# Configure: https://github.com/52North/sensorweb-client-core#configuration and http://sensorweb.demo.52north.org/jsClient/settings.json
WORKDIR /usr/share/nginx/html
#COPY settings.json settings.json

# leave default CMD
# docker build -t 52n-smle .
# docker run --name smle -p 80:80 52n-smle
# http://localhost
