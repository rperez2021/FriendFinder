const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

var homepage = path.basename('...\app\public\survey.html');
// Returns: 'myfile.html'

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.send('hello world'))

app.listen(3000, () => console.log('Listening on localhost:3000'))

app.use(function (req, res, next) {
    res.status(404).send("404! Sorry can't find that!")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('500! Something broke! And the Error Handler was used!')
})




