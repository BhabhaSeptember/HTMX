//package.json uses "'type':'module'" to enable use of 'import'
//"'type':'commonjs' uses "requires" syntax"
import express from "express";
import xss from 'xss';

const app = express();

//*****MIDDLEWARE FUNCTIONS*****/
//To serve static files from public folder
app.use(express.static("public"));
//Parse/Get data from URL-encoded/form bodies
app.use(express.urlencoded({ extended: true }));
//Parse/Get data from json API client bodies
app.use(express.json());


let counter = 0;
//Handle GET request for polling example
app.get("/poll", (req, res) => {
  counter++;
  const data = { value: counter };
  res.json(data);
});

//*********************************************************************************************/
let currentTemp = 20;
//Handle GET request for weather app example
app.get("/get-temperature", (req, res) => {
  currentTemp += Math.random() * 2 - 1;

  res.send(currentTemp.toFixed(1) + "°C");
});

//Starting the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
