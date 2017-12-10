const port = 80;

const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

mongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);

    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log('Started on port ' + port)
    });
});
