const notesRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeFromFile } = require('../helper/fsUtil');

// GET Route for retrieving all the feedback
notesRouter.get('/', (req, res) =>
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
notesRouter.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(), // Unique identifier for each note
    };

    readAndAppend(newNote, './db/notes.json');

    const response = {
      status: 'successful',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting your note');
  }
});

// notes on this piece https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
notesRouter.delete('/:id', (req,res) => {
    const noteId = req.params.ids;

    readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
    // Filter out the note with the id to delete
    const filteredNotes = json.filter((note) => note.id !== noteId);

    writeFromFile('./db/notes.json', filteredNotes);

    res.json(`Note with an id %{noteId} has been deleted.`);
    
    })
    .catch((error) => res.status(500).json('Error in deleting note: ' + error));
});

module.exports = notesRouter;
