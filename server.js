var express = require('express');
var app = express();
const path = require('path');

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

app.use(express.static(__dirname+'/public'));





const user = {
        firstName: "John",
        lastName: "Doe",
        dob: "01/01/2000",
        email: "johndoe@sample.com",
        phoneNum:"(703) 222-1234"
      }



// main page
app.get('/', function(req, res) {
  res.render('pages/listener_main');
});

app.get('/listener_profile', function(req, res) {
  res.render('pages/listener_profile', {user: user});
});

// about music tab
app.get('/listener_music', function(req, res) {
  res.render('pages/listener_music');
});

app.get('/listener_news', function(req, res) {
  res.render('pages/listener_news');
});

app.get('/listener_podcast', function(req, res) {
  res.render('pages/listener_podcast');
});

app.listen(8080);
console.log('Server is listening on port 8080');