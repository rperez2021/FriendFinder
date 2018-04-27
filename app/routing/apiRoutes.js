const path = require('path');
var firebase = require('firebase');
var friends = require('../data/petpals.js');



module.exports = function (app) {

    //This will be used to display a JSON of all possible friends.
    app.get('/api/pals', (req, res) => {
        return firebase.database().once('value').then(function (snapshot) {
            var pet_data = snapshot.val();
            res.send(pet_data)
        });
    })

    app.post('/api/pals', function (req, res) {
        // Capture the user input object
        var userInput = req.body;
        console.log('userInput = ' + JSON.stringify(userInput));

        var userResponses = userInput.scores;
        // console.log('userResponses = ' + userResponses);

        // Compute best friend match
        var matchName = '';
        var matchImage = '';
        var totalDifference = 10000; // Make the initial value big for comparison

        console.log(friends.Object)
        // Examine all existing friends in the list
        for (var i = 0; i < friends.length; i++) {
            console.log('friend = ' + JSON.stringify(friends[i]));

            // Compute differenes for each question

            var diff = 0;
            for (var j = 0; j < userResponses.length; j++) {
                diff += Math.abs(friends[i].scores[j] - userResponses[j]);
            }
            console.log('diff = ' + diff);

            // If lowest difference, record the friend match
            if (diff < totalDifference) {
                console.log('Closest match found = ' + diff);
                console.log('Friend name = ' + friends[i].name);
                console.log('Friend image = ' + friends[i].photo);

                totalDifference = diff;
                matchName  = friends[i].name;
                matchImage  = friends[i].photo;
            }
        }

        // Add new user
        var key = firebase.database().ref().push().key
        firebase.database().ref(req.body.name).update(req.body)

        // Send appropriate response
        res.json({ status: 'OK', matchName: matchName, matchImage: matchImage });
    });





};





// var pals_db = function get_pet_data() {
//     return firebase.database().ref('pals/').once('value').then(function(snapshot) {
//        return snapshot.val();

// });
// }
// console.log(pals_db()) 

//     var new_pet_score = req.body.scores.map(Number).reduce( (accumulator, currentValue) => accumulator + currentValue);

    // new_pet_score.forEach(element => {

    // });
    // console.log(req.body)
    // console.log(req.body.scores)
    // res.end(JSON.stringify(req.body, null, 2))


    // app.use("/api/add", (req, res) => {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
//     var key = firebase.database().ref().push().key
//     firebase.database().ref('pals/' + key).update(req.body)
//     console.log(req.body.scores)
//     var new_pet_score = req.body.scores.map(Number);
//     console.log(new_pet_score)
//     return firebase.database().ref('pals/').once('value').then(function(snapshot) {
//         var pet_data = snapshot.val();


//         res.send(pet_data)
// });

    // app.use("/api/friends", (req, res) => {
    //     res.setHeader('Content-Type', 'text/plain')
    //     res.write('you posted:\n')
    //     res.end(JSON.stringify(req.body, null, 2))
    //     var key = firebase.database().ref().push().key
    //     firebase.database().ref('pals/' + key).update(req.body)
    //     console.log(req.body.scores)
    //     var new_pet_score = req.body.scores.map(Number);
    //     console.log(new_pet_score)





    // })