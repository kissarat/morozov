const { ServerResponse } = require('http');
const config = require('config');
const pkg = require('../package.json');

const headers = {
    ...config.get('response.headers'),
    server: `${pkg.name}/${pkg.version}`
}

ServerResponse.prototype.json = function(status = 200, data = { ok: 1}) {
    this.writeHead(status, {
        ...headers,
        'content-type': 'application/json'
    })
    this.write(
        config.get('response.pretty')
        ? JSON.stringify(data, null, '\t')
        : JSON.stringify(data)
    );
    this.end();
}

ServerResponse.prototype.report = function(status = 500, err = 'Unknown error') {
    let result;
    if ('string' === typeof err) {
        result = { message: err };
    }
    else if (err instanceof Error) {
        console.error(err);
        result = { message: err.message };
        // result.type = err.constructor.name;
        result.name = err.name;
        if ('string' === typeof err.stack) {
            result.stack = err.stack.split('\n').map(s => s.trim().replace('at ', ''));
        }
    } else {
        result = err;
    }
    this.json(status, result);
}
