const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(express.static(__dirname + `/public`));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/weather_now', function (req, response) {
    console.log('weather_now', req.body)
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + req.body.country + '&appid=3a3bbf1a91a9516fe29c032082b9978b')
        .then(res => {
            response.send(res.data);
        })
        .catch(err => response.send(err.response.data.cod));
});

app.post('/weather_forecast', function (req, response) {
    console.log('weather_forecast', req.body)
    axios.get('https://api.openweathermap.org/data/2.5/forecast?q=' + req.body.country + '&appid=3a3bbf1a91a9516fe29c032082b9978b')
        .then(res => {
            response.send(res.data);
        })
        .catch(err => response.send(err.response.data.cod));
});

app.listen(7788, function () {
    console.log('Example app listening on port 7788!');
});
