const express = require('express');

const app = express();

app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

const port = 8000;

app.listen(port, function(err){
    if(err){
        console.log(`error is ${err}`);
    }
    console.log(`server is running on port ${port}`);
});