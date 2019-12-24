const http = require('http');
const config = require('config');
const handle = require('./handle');
const pkg = require('../package.json');
const { connect } = require('./mongo');
const { loadJSON } = require('./utils');
require('./extensions');

const server = http.createServer(async function(req, res) {
   try {
      const [ name ] = req.url.slice(1).split('?');
      if ('' === name) {
         res.json(200, {
            name: pkg.name,
            version: pkg.version,
         });
      } else if (/^\w+$/.test(name)) {
         let data = null;
         if ('GET' !== req.method) {
            data = await loadJSON(req);
         }
         const responseData = await handle(name, req.method, {}, data);
         res.json(200, responseData);
      } else {
         res.report(404, `Resource "${name}" not found`);
      }
   } catch (err) {
      res.report(500, err);
   }
});

async function main() {
   try {
      await connect();
      server.listen(config.get('http.port'));
   } catch(err) {
      console.error(err);
   }
}

main();
