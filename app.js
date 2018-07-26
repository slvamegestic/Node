var  express=require("express"),
     ejs=require("ejs"),
     bodyparser=require("body-parser"),
     mongoose=require("mongoose"),
     User  =require("./models/user");
     passport=require("passport"),
     localStrategy=require("passport-local"),
     passportLocalMongoose=require("passport-local-mongoose");
var path = require('path');
 mongoose.connect("mongodb://localhost/auth-demo-app");
 const MongoClient = require('mongodb').MongoClient;

var app=express();
app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:true}));
app.use(require("express-session")({
  secret:"Rusty is my Bestie",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req,res){
  res.render("home")
});

app.get("/secret", isLogedIn,function(req,res){
res.render("secret")
 });




//this show signup form
app.get("/register",function(req,res){
  res.render("register")
});

app.post("/register",function(req,res){
  req.body.username
  req.body.password
  User.register(new User({username: req.body.username}),req.body.password, function(err,user){
    if (err){
      console.log(err);
      return res.render("register");
    }
  passport.authenticate("local")(req,res, function(){
    res.render("login");
  });
  });
});


app.get("/login",function(req,res){

  // var username = req.user; // here we assume the username is stored as 'name' as you have in your code but change this based on your schema
  // User.findOne({name: username}, function(err, user, data) {
  //    if(err) res.send(err);
  //    user.isLoggedIn = true;
  //    user.save(function (err) {
  //       if (err) {
  //          console.log(err);
  //       } else {
  //       res.render("secret")   // redirect to some page here maybe
  //       }
  //    });
  // });
  res.render("login")
});
//logic of login
app.post("/login", passport.authenticate("local",
{
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function(req,res){
});

app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
});

function isLogedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}
app.get("/status",function(req,res){
  User.find({}).exec(function(err, users) {
       if (err) throw err;
       res.render("status",{ "users": users });
   });

});




let db;

// Replace the URL below with the URL for your database
// const url =  'mongodb://user:password@mongo_address:mongo_port/clicks';
//
// MongoClient.connect(url, (err, database) => {
//   if(err) {
//     return console.log(err);
//   }
//   db = database;
//   // start the express web server listening on 8080
//   app.listen(8080, () => {
//     console.log('listening on 8080');
//   });
// });

// serve the homepage
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // add a document to the DB collection recording the click event
// app.post('/clicked', (req, res) => {
//   const click = {clickTime: new Date()};
//   console.log(click);
//   console.log(db);
//
//   db.collection('clicks').save(click, (err, result) => {
//     if (err) {
//       return console.log(err)lapse;
//     }
//     console.log('click added to db');
//     res.sendStatus(201);
//   });
// });
//
// // get the click data from the database
// app.get('/clicks', (req, res) => {
//   db.collection('clicks').find().toArray((err, result) => {
//     if (err) return console.log(err);
//     res.send(result);
//   });
// });
var server =app.listen(1234,listening);

function listening(){
  console.log("listening....");
}
