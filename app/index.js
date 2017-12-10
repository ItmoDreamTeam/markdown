const routes = require('./routes');
module.exports = function (app, db) {
    routes(app, db);

    //client
    app.get('/', function (request, response) {
        response.sendFile(__dirname + '/client/index.html');
    });
    app.get('/script.js', function (request, response) {
        response.sendFile(__dirname + '/client/script.js');
    });
    app.get('/vue.js', function (request, response) {
        response.sendFile(__dirname + '/client/lib/vue.js');
    });
};
