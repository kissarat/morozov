const { ServerResponse } = require('http');
const config = require('config');
const pkg = require('../package.json');

const headers = {
    ...config.get('response.headers'),
    server: `${pkg.name}/${pkg.version}`
}

ServerResponse.prototype.json = function(data) {
    this.writeHead(200, headers)
    this.write(
        config.get('response.pretty')
        ? JSON.stringify(data, null, '\t')
        : JSON.stringify(data)
    );
    this.end();
}