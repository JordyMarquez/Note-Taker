// imports packages and paths needed to run app
const express = require('express');
const path = require('path')
const fs = require('fs')
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// uses heroku's environment to run app or localhost at 3001
const PORT = process.env.PORT || 3001;
const app = express();


// runs express package
app.use(express.json()); 
// converts HTML to URL format
app.use(express.urlencoded({ extended: true })); 

// 
app.use(express.static('public'));

// connects paths to routes listed up top
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// binds to port and listens for connections
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));