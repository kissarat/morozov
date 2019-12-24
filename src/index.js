const http = require('http');
const config = require('config');
require('./extensions');


const server = http.createServer(function(req, res) {
   res.json({ ok: 1 });
});

server.listen(config.get('http.port'));
