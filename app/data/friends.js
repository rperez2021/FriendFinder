var firebase = require('firebase');
var fs = require('fs');


module.exports = function(app) {
var pals = firebase.database().ref();
pals.on('value', function(snapshot) {
    fs.writeFile('./app/data/petpals.js', 'var array = ['+JSON.stringify(snapshot.val())+']', 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    
});

}