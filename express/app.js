// Import the top-level function of express
var express = require('express');

// Creates an Express application using the top-level function
var app = express();

// Define port number as 3000
const PORT = 3000;

// bodyparser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

// MongoDB
var MongoClient = require('mongodb').MongoClient;

// Static resources
app.use('/res', express.static(__dirname + '/images'));

// Routings
app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname});
});

app.post('/submit-student-data', function (req, res) {
    var name = req.body.firstName + ' ' + req.body.lastName;

    res.send(name + ' Submitted Successfully!');
});

app.get('/db', function (req, res) {
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/bluedb", function (err, db) {

        if (err)
            throw err;
        db.collection('Express', function (err, collection) {
            collection.insert({id: 1, 'labelSN': '613933397380', 'date': '20170509'});
            collection.insert({id: 2, 'labelSN': '613933397382', 'date': '20170509'});
            collection.insert({id: 3, 'labelSN': '613933397385', 'date': '20170509'});
        });

/*
        db.collection('Express').count(function (err, count) {
            if (err)
                throw err;

            console.log('Total Rows: ' + count);
            res.send('documents in collection: ' + count);
        });
        */
        
        db.collection('Express').findOne({id:1},function(err, data){
        //db.collection('Express').find(function(err, data){
            if(err) throw err;
            console.log(data);
            res.send(data);
        });
    });

});

// Make the app listen on port 3000
app.listen(PORT, function () {
    console.log('Server listening on http://localhost:' + PORT);
});