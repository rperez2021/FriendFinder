const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

//Firebase DB Setup
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

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"));
})

app.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
})

//This will be used to display a JSON of all possible friends.
app.get('/api/friends', (req, res) => {
    res.sendFile(path.join(__dirname, "../data/petpals.json"));
})

app.use("/api/friends", (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    var new_pet_score = req.body.scores
    new_pet_score.forEach(element => {
        
    });
    console.log(req.body)
    console.log(req.body.scores)
    res.end(JSON.stringify(req.body, null, 2))
    
})

app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, "../public/home.html"))
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('500! Something broke! And the Error Handler was used!')
})



app.listen(3000, () => console.log('Petpal is Listening on localhost:3000'))



