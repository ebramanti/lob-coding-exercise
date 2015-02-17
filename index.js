var Hapi = require('hapi'),
    fs = require('fs'),
    routes = require('./routes');

var server = new Hapi.Server('0.0.0.0', '8000');

server.route(routes);

// Check if thumbs and tmp dirs are initialized.
var thumbsDir = __dirname + '/thumbs',
    tmpDir = __dirname + '/tmp';
if (!fs.existsSync(thumbsDir)) {
    fs.mkdirSync('thumbs')
}
if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync('tmp')
}

server.start();
console.log('Server Started On localhost:8000');
