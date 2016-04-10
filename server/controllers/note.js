var express = require('express');
var router = express.Router();
var Note = require('../models/note');

// Create a new note
router.post('/note', function(req, res, next) {

    Note.create(req.body, function(err, note) {
        if(err) {
            next(err);
        } else {
            res.status(201).send(note);
        }
    });
});

// List of all notes
router.get('/notes', function(req, res, next) {

    Note.request( 'all', function(err, notes) {
        if(err) {
            next(err);
        } else {
            res.status(200).json(notes);
        }
    });
});

// Export the router instance to make it available from other files.
module.exports = router;
