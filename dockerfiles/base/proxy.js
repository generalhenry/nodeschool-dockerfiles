var http = require('http');
var fs = require('fs');
var childProcess = require('child_process');
var path = '/var/run/proxy';
var httpProxy = require('http-proxy');
var url = require('url');

if (fs.existsSync(path)) {
  fs.unlinkSync(path);
}

var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function (req, res) {
  console.log('http', req.headers.host);
  console.log(url.parse('http://' + req.headers.host));
  proxy.web(req, res, {
    target: {
      host: 'localhost',
      port: url.parse('http://' + req.headers.host).port
    }
  });
});

server.on('upgrade', function (req, socket, head) {
  console.log('ws', req.headers.host);
  proxy.ws(req, socket, head, {
    target: {
      host: 'localhost',
      port: 80
    }
  });
});

var count = 0;
(function waitForPort () {
  console.log(count++);
  if (started) {
    return false;
  }
  setTimeout(function () {
    var req = http.get('http://localhost', function (res) {
      res.pipe(process.stdout);
      res.on('end', start);
      res.on('error', waitForPort);
    });
    req.on('error', waitForPort);
  }, 20);
})();

var started = false;
function start () {
  if (started) {
    return false;
  }
  started = true;
  server.listen(path, function (err) {
    if (err) throw err;
    console.log('started');
  });
}

childProcess.spawn('n', ['use', '0.10.31', '/expose/node_modules/expose-bash-over-websockets/server.js']);
