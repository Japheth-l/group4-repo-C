require('dotenv').config();
const express = require('express');

const logger       = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const notesRouter  = require('./routes/notes');

const app = express();

app.use(express.json());
app.use(logger);               // logging middleware

app.use('/notes', notesRouter); // routes

app.use(errorHandler);         // global error handler — always last

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});