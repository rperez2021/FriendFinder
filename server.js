var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyB35Azq0vglMeEo4yo6NHjNwRkDIvzRWxo",
    authDomain: "pet-pal-finder.firebaseapp.com",
    databaseURL: "https://pet-pal-finder.firebaseio.com",
    projectId: "pet-pal-finder",
    storageBucket: "pet-pal-finder.appspot.com",
    messagingSenderId: "318967169872"
};
firebase.initializeApp(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);
require(path.join(__dirname, './app/data/friends'))(app);

app.listen(3000, () => console.log('Petpal is Listening on localhost:3000'))