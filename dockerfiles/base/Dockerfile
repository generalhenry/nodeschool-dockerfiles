FROM node

RUN apt-get update
RUN apt-get install -y vim emacs screen tmux nano curl wget
RUN npm install hipster n -g
RUN n latest
RUN n stable

RUN mkdir /expose
WORKDIR /expose
RUN npm install expose-bash-over-websockets

WORKDIR /root

EXPOSE 80
CMD n use $(n --stable) /expose/node_modules/expose-bash-over-websockets/server.js

ADD initfile /root/.initfile
ONBUILD ADD initfile /root/.initfile
