const express = require('express');
const hbs = require("hbs");
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials/');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();

    var log = `${now}: ${req.method} : ${req.url} \n`;
    fs.appendFile('log.txt', log, (err) => {
        if (err) {
            console.log('unable to append file');
        }
    });
    next();
});

// app.use((req, res, next) => {
//    res.render('maintenance', {
//        pageTitle: 'Maintenance page',
//        welcomeMessage: "Site on maintenance"
//    });
// });

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: "Hello on my site"
    });
});

app.get("/about", (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        welcomeMessage: "Hello on about page"
    });
});

app.get("/project", (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Portfolio page',
        welcomeMessage: "Hello on portfolio page"
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Error!!!"
    });
});

app.listen(port, () => {
    console.log(`Server run on http://localhost:${port}`);
});