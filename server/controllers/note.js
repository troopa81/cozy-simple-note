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

module.exports.update = function(req, res, next) {
    
	Note.save(req.params.noteId, req.body, function(err, note){
        if (err) {
			next(err);
        } else {
            res.status(200);
        }
    });
}

// delete a note according its id
module.exports.deleteNote = function(req, res, next) {
	
	Note.destroy( req.params.noteId, function(err){
		if (err) {
			console.log("merde!");
			next(err);
        } else {
			console.log("OK!");
            res.status(200);
        }
	});
}

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

// Find a note
module.exports.find = function(req, res, next) {

    Note.find( req.params.noteId, function(err, note) {
        if(err) {
            next(err);
        } else {
            res.status(200).json(note);
        }
    });
};

