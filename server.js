const express = require('express');
const path = require('path');
const noteData = require('./Develop/db/db.json');
const uuid = require ('./Develop/public/assets/js/uuid');
const indexjs = require('./Develop/public/assets/js/index');
const note_id =0;
const PORT = process.env.PORT || 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.get('/api/notes', (req, res) => res.json(noteData));
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

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

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/index.html'));
});
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});