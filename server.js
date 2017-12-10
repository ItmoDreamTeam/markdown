const port = 80;

const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

app.listen(port, () => {
    console.log('Started on port ' + port)
});
