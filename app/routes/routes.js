module.exports = function(app, db) {
    //get all
    app.get('/api/md', (req, res) => {
    });

    //create
    app.post('/api/md', (req, res) => {
        res.send(req.body);
    });

    //edit
    app.put('/api/md', (req, res) => {
    });
};
