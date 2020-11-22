//////this index.js represents server side (local server, since it's located in your machine...)////
const express = require("express");
const app = express();
const Datastore = require("nedb");
const fetch = require("node-fetch");
require("dotenv").config();
console.log(
  " THIS IS YOUR API KEY , WHICH IS STORED IN AN ENVIRONMENT VARIABLE: " +
    process.env.API_KEY
);

app.listen(3000, console.log("listening at port 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();
//save checkin to db
app.post("/api", (req, res) => {
  console.log("request recieved!");
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  res.json({
    status: "saved to database",
    timestamp: timestamp,
    latitude: req.body.lat,
    longitude: req.body.lon,
    temp: req.body.temp,
    air_quality: req.body.air,
  });
});

//get all database enteries
app.get("/db", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});
app.get("/weather/:latlon", async (request, response) => {
  const latlon = request.params.latlon.split(",");
  const lat = latlon[0];
  const lon = latlon[1];
  const api_key = process.env.API_KEY;

  const weather_url = `https://api.climacell.co/v3/weather/realtime?lat=${lat}&lon=${lon}&fields=temp&fields=precipitation_type&apikey=${api_key}`;
  const weatherResponse = await fetch(weather_url);
  const weather_data = await weatherResponse.json();

  const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
  const aqResponse = await fetch(aq_url);
  const aq_data = await aqResponse.json();
  const data = {
    weather: weather_data,
    air_quality: aq_data,
  };
  response.json(data);
});

// const api_url = `https://api.climacell.co/v3/weather/realtime?lat=${lat}&lon=${lon}&fields=temp&apikey=WPs0wyUXnVT5SUV3P9wd1AKjBX6C9B4Y`;

// app.post("/message", (req, res) => {
//   console.log("submitted");
//   const data = req.body;
//   const timestamp = Date.now();
//   data.timestamp = timestamp;
//   database.insert(data);
//   res.json({
//     status: "success",
//     timestamp: timestamp,
//     // message: req.body.msgContent,
//     // message: req.body.message,
//   });
// });
