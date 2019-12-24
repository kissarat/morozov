const http = require('http');
const config = require('config');
const handle = require('./handle');
const pkg = require('../package.json');
const { connect } = require('./mongo');
const { loadJSON } = require('./utils');
const { parse } = require('querystring');
require('./extensions');

const server = http.createServer(async function(req, res) {
   try {
      const [ name, ...search ] = req.url.slice(1).split('?');
      if ('' === name) {
         res.json(200, {
            name: pkg.name,
            version: pkg.version,
         });
      } else if (/^\w+$/.test(name)) {
         res.json(200, await handle(
            name,
            req.method,
            search.length > 0 ? parse(search.join('?')) : {},
            await loadJSON(req) || null
         ));
      } else {
         res.report(400, `Invalid path "${name}"`);
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
