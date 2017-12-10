module.exports = function(app, db) {
    //get all
    app.get('/api/md', (req, res) => {
        res.send(db.collection('md'))
    });

    //create
    app.post('/api/md', (req, res) => {
        db.collection('md').insertOne({_id: req.body.name, content: ''}, (err, result) => {
            if (err) res.send('ERROR');
            else res.send('OK');
        });
    });

    //edit
    app.put('/api/md', (req, res) => {
    });
};
