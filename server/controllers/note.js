var Note = require('../models/note');

// Create a new note
module.exports.create = function(req, res, next) {

    Note.create(req.body, function(err, note) {
        if(err) {
            next(err);
        } else {
            res.status(201).send(note);
        }
    });
};

// List of all notes
module.exports.list = function(req, res, next) {

    Note.request( 'all', function(err, notes) {
        if(err) {
            next(err);
        } else {
            res.status(200).json(notes);
        }
    });
};

