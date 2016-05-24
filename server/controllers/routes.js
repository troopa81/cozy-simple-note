var index = require('./index');
var note = require('./note');

module.exports = {
	'': { 
		get: index.index
	},
	'note': {
        post: note.create,
    },
	'note/:noteId' : {
		get: note.find
	},
	'notes': {
        get: note.list,
    },
};