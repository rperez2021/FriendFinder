const path = require('path');


// var pals_db = function get_pet_data() {
//     return firebase.database().ref('pals/').once('value').then(function(snapshot) {
//        return snapshot.val();
        
// });
// }
// console.log(pals_db())

module.exports = function(app) {

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"));
})

app.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
})

app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, "../public/home.html"))
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('500! Something broke! And the Error Handler was used!')
})

};




