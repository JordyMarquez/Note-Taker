const path = require('path')
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { parse } = require('path');

const api = express();

api.get('/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        }
        else {
            const parsedNotes = JSON.parse(data);
            return res.json(parsedNotes)
        }
    })
});


api.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            }
            else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);

                fs.writeFile('db/db.json', JSON.stringify(parsedNotes, null, 4), (writeErr) =>
                    writeErr
                        ? console.error(writeErr)
                        : console.info('Successfully updated notes'))
            }
        });

        const note = {
            body: newNote
        };

        res.status(201).json(newNote);
    }
})

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
                return res.json(parsedNotes)
            })
        }
    })
});
// / GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

module.exports = api