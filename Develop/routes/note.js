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

module.exports = notesRouter;
