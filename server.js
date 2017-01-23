var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req,res) {
    res.json({ message: 'json up and running' });
});


app.listen(3000);

