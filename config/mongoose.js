const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "crror conencting to mongodb"));

db.once('open', function(){
    console.log("connected to db");
});