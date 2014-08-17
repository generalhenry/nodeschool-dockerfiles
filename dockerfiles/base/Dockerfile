FROM node

RUN apt-get update
RUN apt-get install -y vim emacs screen tmux nano curl wget
RUN npm install hipster n -g
RUN n latest
RUN n stable

RUN mkdir /expose
WORKDIR /expose
RUN npm install expose-bash-over-websockets http-proxy
ADD proxy.js /expose/proxy.js

WORKDIR /root

CMD n use $(n --stable) /expose/proxy.js

ADD initfile /root/.initfile
ONBUILD ADD initfile /root/.initfile
