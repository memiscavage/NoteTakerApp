const express = require("express");
const path = require('path');
const app = express();
const PORT = 3001;
const fs = require('fs');
const newID = require('./helpers/uuid.js')

//Connect db file to server
const db = require("./db/db.json")


// Middleware for json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Get requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});
app.get('/api/notes', (req, res) => {
  res.json(db);
});

//Post request, from module 11 solved student POST fetch activity
app.post('api/notes', (res, req) => {
  console.info(`${req.method} request received to add a new note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };
    // fs read and write files from module 11 sovled student data persistence activity
    fs.readFile(`./db/db.json`, `utf8`, (error, data) => {
      if (error) {
        return console.log(error);
      } else {
        const parsedNote = JSON.parse(data);
        parsedNote.push(newNote);
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNote),
          (writeErr) =>
            writeErr
              ? console.error(writeErr) : console.info('Successfully updated your note!')
        )
      }
    })


    const response = {
      status: 'success',
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }

});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

