require('dotenv').config();

/**
 * Express Documentation API - http://expressjs.com/api.html
 */
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = 'mongodb://127.0.0.1:27017/jukebox';

 /**
 * Mongoose Documentation API - http://mongoosejs.com/docs/api.html
 */
const mongoose = require('mongoose');

mongoose.connect(db)
    .then(() => console.log('Connected to ' + db))
    .catch(err => console.error(err));

const Server = require('./models/Server.model');

/**
 * * Get Server info by ID
 */
app.get('/api/server/:id', (req, res) => {

    Server.find({id: req.params.id})
        .then(server => res.json(server))
        .catch(err => 
            res.status(400).json(err)
        );
});

// Port
app.listen(port, () => console.log('Listening on port ' + port + '...'));