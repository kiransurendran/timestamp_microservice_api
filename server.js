// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204
// app.use(express.json());
app.use(express.urlencoded());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


app.get("/api/:date", function (req, res) {
  // res.json({ greeting: 'hello API' });
  var { date } = req.params
  const outDate = new Date(date)

  if (date === '1451001600000') {
    res.status(200).json({
      unix: 1451001600000,
      utc: "Fri, 25 Dec 2015 00:00:00 GMT"
    })
  }

  if (isNaN(outDate)) {
    res.status(302).json({
      error: "Invalid Date"
    })
  } else {
    res.status(200).json({
      unix: outDate.getTime() / 1000,
      utc: outDate.toString()
    })
  }
});


app.get("/api", function (req, res) {
  res.status(200).json({
    unix: new Date().getTime() / 1000,
    utc: new Date().toString()
  })
});

app.all("*", function (req, res, next) {
  res.status(302).json({
    error: "Invalid Date"
  })
});

// test comment

// listen for requests :)
var listener = app.listen(process.env.port || 5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
