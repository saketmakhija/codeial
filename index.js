const express = require('express');

const app = express();
const ejsLayouts = require('express-ejs-layouts');


app.use(express.static('./assets'));

app.use(ejsLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

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