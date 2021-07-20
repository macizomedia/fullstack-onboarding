// user operations will be handled here...
const project = require('express').Router();

project.use('/', (req, res, next) => {
    // implement your middleware here (if needed))
    console.log('');
    next();

});


module.exports = project;