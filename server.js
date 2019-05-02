const request = require('request');
const express = require('express');
const path = require('path');
const api = express();
var fs = require('fs');
var cors = require('cors');

api.use(cors())
api.get('/data', (req, res) => {

    const options = {
        url: 'https://api.oip.tm.com.my/app/t/malaysia.open.data/met/1.0.0/v2/data?datasetid=' + req.query.id + '&datacategoryid=' + req.query.id2 + '&locationid=LOCATION:' + req.query.location + '&start_date=' + req.query.date1 + '&end_date=' + req.query.date2,
        headers: {
            'Authorization': 'Bearer <SEP Token, subscribe to our OIP SEP to get it>',
            'BEToken': 'METToken <Replace with Your MET Token or else Get from our OIP SEP>'
        }

    };
    var info2
    console.log(options.url);
    console.log(req.query.location)
    console.log(req.query.id)
    console.log(req.query.id2)
    console.log(req.query.date1)
    console.log(req.query.date2)

    function callback(error, response, body) {
        console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            res.send(
                info
            );
        } else {
            res.send({
                statusCode: response.statusCode
            })
        }
    }
    request(options, callback);
});

api.get('/satellite', (req, res) => {
    const options = {
        url: 'https://api.oip.tm.com.my/app/t/malaysia.open.data/met/1.0.0/static/images/satelit-latest.gif',
        headers: {
            'Authorization': 'Bearer <SEP Token, subscribe to our OIP SEP to get it>',
            'BEToken': 'METToken <Replace with Your MET Token or else Get from our OIP SEP>',
            'Content-Type': 'image/gif',
            'Accept': 'image/gif'
        }

    };
    var download = function (uri, filename, callback) {
        request.head(uri, function (err, response, body) {
            console.log('content-type:', response.headers['content-type']);
            console.log('content-length:', response.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };
    download(options, 'satellite.gif', function () {
        console.log('done');
        res.sendFile(path.join(__dirname, 'satellite.gif'));

    });
    //console.log(info);
});

api.get('/radar', (req, res) => {
    const options = {
        url: 'https://api.oip.tm.com.my/app/t/malaysia.open.data/met/1.0.0/static/images/radar-latest.gif',
        headers: {
            'Authorization': 'Bearer <SEP Token, subscribe to our OIP SEP to get it>',
            'BEToken': 'METToken <Replace with Your MET Token or else Get from our OIP SEP>',
            'Content-Type': 'image/gif',
            'Accept': 'image/gif'
        }

    };
    var download = function (uri, filename, callback) {
        request.head(uri, function (err, response, body) {
            console.log('content-type:', response.headers['content-type']);
            console.log('content-length:', response.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };
    download(options, 'radar.gif', function () {
        console.log('done');
        res.sendFile(path.join(__dirname, 'radar.gif'));

    });

});

api.get('/swirl', (req, res) => {
    const options = {
        url: 'https://api.oip.tm.com.my/app/t/malaysia.open.data/met/1.0.0/static/images/swirl-latest.gif',
        headers: {
            'Authorization': 'Bearer <SEP Token, subscribe to our OIP SEP to get it>',
            'BEToken': 'METToken <Replace with Your MET Token or else Get from our OIP SEP>',
            'Content-Type': 'image/gif',
            'Accept': 'image/gif'
        }

    };
    var download = function (uri, filename, callback) {
        request.head(uri, function (err, response, body) {
            console.log('content-type:', response.headers['content-type']);
            console.log('content-length:', response.headers['content-length']);

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };
    download(options, 'swirl.gif', function () {
        console.log('done');
        res.sendFile(path.join(__dirname, 'swirl.gif'));
    });
});

module.exports = api
api.listen(8080, (error) => {
    if (error) return console.log(`Error: ${error}`);
});
