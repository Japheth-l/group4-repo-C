const express = require('express');
const router = express.Router();
const noteSchema = require('../validators/noteValidator');

let notes = [];
let id = 1;

// CREATE
router.post('/', async (req, res, next) => {
  try {
    const { error, value } = noteSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newNote = { id: id++, text: value.text, createdAt: new Date() };
    notes.push(newNote);
    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
});

// READ ALL + SEARCH
router.get('/', (req, res) => {
  const { q } = req.query;
  if (q) {
    return res.json(notes.filter(n => n.text.toLowerCase().includes(q.toLowerCase())));
  }
  res.json(notes);
});

// READ ONE
router.get('/:id', async (req, res, next) => {
  try {
    const note = notes.find(n => n.id == req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.patch('/:id', async (req, res, next) => {
  try {
    const note = notes.find(n => n.id == req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    const { error, value } = noteSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    note.text = value.text;
    note.updatedAt = new Date();
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete('/:id', (req, res) => {
  const note = notes.find(n => n.id == req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found' });

  notes = notes.filter(n => n.id != req.params.id);
  res.json({ message: 'Note deleted successfully' });
});

module.exports = router;