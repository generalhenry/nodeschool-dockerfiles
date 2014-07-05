FROM node

RUN apt-get update
RUN apt-get install -y vim emacs screen tmux
RUN npm install hipster -g

RUN mkdir /expose
WORKDIR /expose
RUN npm install expose-bash-over-websockets

WORKDIR /root

EXPOSE 80
CMD node /expose/node_modules/expose-bash-over-websockets/server.js

ADD initfile /root/.initfile
ONBUILD ADD initfile /root/.initfile
