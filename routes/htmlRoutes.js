const path = require('path')
const express = require('express') //what does Router do

const HTML = express();

HTML.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});
HTML.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})


module.exports = HTML