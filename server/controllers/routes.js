var index = require('./index');
var note = require('./note');

module.exports = {
	'': { 
		get: index.index
	},
	'note': {
        post: note.create,
		
    },
	'notes': {
        get: note.list,
    },
};