let bodyParser = require('body-parser');
var express = require('express');
var app = express();

console.log('Hello World')

app.use("/public", express.static(__dirname + "/public"));

app.use(function(req, res, next) {
      console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
app.use(() => {
  bodyParser.urlencoded({extended: false})
})
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get('/json', function(req, res) {
    res.send({"message": (process.env.MESSAGE_STYLE == "uppercase") ? "Hello json".toUpperCase() : "Hello json" });
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString()
  next();
}, function(req, res) {
  res.send({"time": req.time});
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.get("/name", (req, res) => {
  let {first, last} = req.query
  res.json({
    name: `${first} ${last}`
  })
});





module.exports = app;
