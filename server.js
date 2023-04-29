const express = require('express');
const path = require('path');
const noteData = require('./Develop/db/db.json');
const uuid = require ('./Develop/public/assets/js/uuid');
const fs = require ('fs');
const id =0;
const PORT = process.env.PORT || 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('Develop/public'));
app.get('/api/notes', (req, res) => {
    fs.readFile('./Develop/db/db.json',"UTF-8",(error,data) =>{
        res.json(JSON.parse(data))});
})
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
    fs.readFile('./Develop/db/db.json',"UTF-8", (error,data) =>  {
        console.log(data);
        // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        data = JSON.parse(data);
        data.push(newNote);
        fs.writeFile('./Develop/db/db.json', JSON.stringify(data), (error) =>{
            if(error){
            res.status(500).json('Error in posting note');
            }
            else{
            res.status(201).json(newNote);
            }
        })
        
    } 
    })
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