var express = require('express');
var app = express();
var nodemailer = require('nodemailer');

// Create a SMTP transporter object
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'travelwithus78@gmail.com',
        pass: 'travel123'
    },
    logger: true, // log to console
    debug: true // include SMTP traffic in the logs
}, {
    // sender info
    from: '<travelwithus78@gmail.com>',
});

app.get('/postEmail', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var message = {
        // Comma separated list of recipients
        to: '"' + req.query.fName + '' + req.query.lName + '"<' + req.query.email + '>',

        // Subject of the message
        subject: 'Travel Booking Confirmation', //

        // HTML body
        html: '<h1>Thank you ' + req.query.fname + ' for booking</h1>' +
        '<table style="font-family:arial,sans-serif;border: 1px solid #000000;border-collapse: collapse;width: 80%;">'
        + '<tr style="background-color: #dddddd;">' +
        '<th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Name:</th>' +
        '<td style="border: 1px solid #dddddd;text-align: left;">' + req.query.fname + ' ' +  req.query.lname +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Phone No:</th>' +
        '<td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">' + req.query.phone + '</td>' +
        '</tr>' +
        '<tr style="background-color: #dddddd;">' +
        '<th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Location:</th>' +
        '<td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">' + req.query.location + '</td>' +
        '</tr>' +
        '<tr>' +
        '<th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Depart Date:</th>' +
        '<td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">' + req.query.departDate + '</td>' +
        '</tr>' +
        '<tr style="background-color: #dddddd;">' +
        '<th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Return Date:</th>' +
        '<td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">' + req.query.returnDate + '</td>' +
        '</tr>' +
        '</table>' +
        ' <h3>Your Booking is confirmed</h3>'
    };

    transporter.sendMail(message, function (error) {
        if (error) {
            res.send('Message sent successfully!', req.query);
            return;
        }
        res.send(req.query);
        console.log('Message sent successfully!');
    });
});

app.listen(7000, function () {
    console.log('app listening the port 7000');
});