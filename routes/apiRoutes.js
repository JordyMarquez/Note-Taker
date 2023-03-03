// imports required packages to run app
const path = require('path')
const express = require('express')
// uses npm pacage of uuuid to give each notea unique id 
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');


const api = express();

// connects path to db.json
api.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'))
});

// post method reads db.json file and returns saved ntoes
api.post('/notes', (req, res) => {

    // creates body of a new note
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        // reads db.json file
        fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            }
            else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);

                // writes to the db.json fille
                fs.writeFile('db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) =>
                    writeErr
                        ? console.error(writeErr)
                        : console.info('Successfully updated notes'))
            }
        });

        const note = {
            body: newNote
        };
        // attaches new note into response
        res.status(201).json(newNote);
    }
})

// deletes note
api.delete('/notes/:id', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        }
        else {
            let parsedNotes = JSON.parse(data);
            parsedNotes = parsedNotes.filter((note) => {
                return note.id !== req.params.id
            })
            fs.writeFile('db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) => {
                writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated notes')
            return res.json(parsedNotes)})
        
    }
    })
});

module.exports = api