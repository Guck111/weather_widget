const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/weather_now', function (req, response) {
    console.log('weather_now', req.body)
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + req.body.country + '&appid=3a3bbf1a91a9516fe29c032082b9978b')
        .then(res => {
            response.send(res.data);
        })
});

app.post('/weather_forecast', function (req, response) {
    console.log('weather_forecast', req.body)
    axios.get('http://api.openweathermap.org/data/2.5/forecast?q=' + req.body.country + '&appid=3a3bbf1a91a9516fe29c032082b9978b')
        .then(res => {
            response.send(res.data);
        })
});

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log("Connected!")
// });
//
// const bookSchema = mongoose.Schema({
//     book_name: String,
//     book_author: String,
// });
//
// const Book = mongoose.model('Book', bookSchema);
//
// const silence = new Book({ book_name: 'Harry Potter', book_author: 'J.Rowling' });
//
// silence.save(function (err, silence) {
//     if (err) return console.error(err);
//     console.log(silence)
// });

app.listen(7788, function () {
    console.log('Example app listening on port 7788!');
    // mongoose.connect('mongodb://guck:guck@ds155218.mlab.com:55218/books');
});
