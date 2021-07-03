// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date', function(req, res, done) {
  var date = new Date(req.params.date);
  
  if (date.toString() == 'Invalid Date'){
    date = new Date(parseInt(req.params.date));
  }
  
  if (date.toString() == 'Invalid Date'){
      res.json({error: date.toString()});  
  } else {
    res.json({unix: date.getTime(), utc: date.toUTCString(), });
  }
});

app.get('/api', function(req, res, done) {
  var date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString(), });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
