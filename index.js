const express = require('express');

const app = express();

app.use('/', require('./routes'));

const port = 8000;

app.listen(port, function(err){
    if(err){
        console.log(`error is ${err}`);
    }
    console.log(`server is running on port ${port}`);
});