const router = require('express').Router();

// importing notes router
const notesRouter = require('./note');

// use the notes router
router.use('/notes', notesRouter);

module.exports = router;
