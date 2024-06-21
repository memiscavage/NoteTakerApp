const express = require("express");
const path = require('path');
const app = express();
const PORT = 3001;

//Connect db file to server
const db = require("./db/db.json")


// Middleware for json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Get requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
)};
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
)};
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
)};
app.get('/api/notes', (req, res) => {
  res.json(db);
)};



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

