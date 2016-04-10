// Definition of the document type and basic operations on notes.
var cozydb = require('cozydb');

var Note = cozydb.getModel('Note', {
    /*
      note title
    */
    'title': {
        default: '',
        type: String,
    },

    /*
      note text
    */
    'text': {
        default: '',
        type: String,
    },
});


// Make this model available from other files.
module.exports = Note;
