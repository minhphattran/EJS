var express = require('express');
var app = express();
const path = require('path');
const mongoose = require("mongoose");
var bodyParser = require('body-parser')

// set the view engine to ejs
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())

app.use(express.static(__dirname+'/public'));

mongoose.connect('mongodb+srv://username:PassWord@cluster0.0jxtibh.mongodb.net/');

const aaaSchema = {
  
        firstName: String,
        lastName: String,
        dob:String,
        email: String,
        phoneNum:String
    
};

const AAA = mongoose.model('aaas', aaaSchema);


const songSchema = {
  title: String,
  artist: String,
  duration: String,
  genre: String,
  flag:String
}

const djSchema = {
    Djname: String,
    Date: String,
    Week: Number,
    DayNum: Number, 
    Time: String,
    playlistName: String,
    Playlists:[songSchema]
}

const Songs = mongoose.model('song', songSchema);

const DJs = mongoose.model('djs', djSchema);

const empty = []


const referencSchema= new mongoose.Schema({ref:String, bool:String});
const References = mongoose.model('refs', referencSchema);




// main page
app.get('/listener_main', async function(req, res) {
  
  let array = []
  const reff = await References.find({"bool": "1"}, {ref:1, _id:0})
  reff.forEach((element) => array = array.concat(Object.values(Object.values(element)[2]))) 
  const first = reff[0]


  const playlist = await DJs.find({"Playlists.artist": {$in:array}})
  const songs = await Songs.find()
  const artists = await References.find()

  // res.render('pages/listener_main', {music: empty});
  res.render('pages/listener_main', {music: songs, reference:artists, playlist: playlist});
});
app.post('/listener_main', async function(req, res) {
  
  if(req.body.search){

    const keyword = req.body.search;
    const filter = {"artist":keyword};
    const results = await Songs.find(filter);
    if(results.length == 0){
      results.push({artist: 'NOT', title: "FOUND"});
    }
    // res.render('pages/listener_music', {data: epty});
    res.render('pages/listener_music', {data: results});
   
  }
  if(req.body.ref){
    const updated = req.body;
    const filter = {"ref":updated.ref};
    
    const inserted = await References.findOneAndUpdate(filter, updated);
    const songs = await Songs.find()
    const artists = await References.find()

    let array = []
    const reff = await References.find({"bool": "1"}, {ref:1, _id:0})
    reff.forEach((element) => array = array.concat(Object.values(Object.values(element)[2]))) 
    

    const playlist = await DJs.find({"Playlists.artist": {$in:array}})
    console.log(playlist)
    // res.render('pages/listener_main', {music: epty});
    res.render('pages/listener_main', {music: songs, reference:artists, playlist: playlist});

  }
  else{
    const updated = req.body;
    
  const filter = {"_id":updated._id};
  let updatedUser = await Songs.findOneAndUpdate(filter, updated);
  const songs = await Songs.find()
  const artists = await References.find()

  let array = []
    const reff = await References.find({"bool": "1"}, {ref:1, _id:0})
    reff.forEach((element) => array = array.concat(Object.values(Object.values(element)[2]))) 
    

    const playlist = await DJs.find({"Playlists.artist": {$in:array}})
    console.log(playlist)
    // res.render('pages/listener_main', {music: epty});
    res.render('pages/listener_main', {music: songs, reference:artists, playlist: playlist});
  }
 
});





app.get('/listener_profile', async function(req, res) {
  const data = await AAA.find();

  // res.render('pages/listener_profile', {user: empty});
  res.render('pages/listener_profile', {user: data});
 
});
app.post('/listener_profile', async function(req, res) {
  const updated = req.body;
  const filter = {"_id":updated._id};
  let updatedUser = await AAA.findOneAndUpdate(filter, updated);
  // res.render('pages/listener_profile', {user: empty});
  res.render('pages/listener_profile', {user: updatedUser});
});





app.listen(8080);
console.log('Server is listening on port 8080');