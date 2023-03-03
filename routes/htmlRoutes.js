// imports required packages to run app
const path = require('path')
const express = require('express') //what does Router do

const HTML = express();

// connects path to notes.html
HTML.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});
// connects path to index.html
HTML.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})


module.exports = HTML