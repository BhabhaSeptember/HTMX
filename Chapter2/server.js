import express from "express";

//Initialize express and save to const to get access to express methods
const app = express();

//Parse URL encoded bodies(as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

//Host static files from public folder
app.use(express.static("public"));

//Parse JSON bodies(as sent by API clients)
//Requests sent and responses recieved in JSON format
app.use(express.json());

app.post("/calculate", (req, res) => {
  const height = parseFloat(req.body.height);
  const weight = parseFloat(req.body.weight);

  const bmi = weight / (height * height); //height**2

  // let category;

  // if (bmi < 18.5) {
  //   category = "Underweight";
  // } else if (bmi <= 24.9) {
  //   category = "Healthy weight";
  // } else if (bmi <= 29.9) {
  //   category = "Overweight";
  // } else {
  //   category = "Obese";
  // }

  // res.send(`Your BMI is ${bmi.toFixed(1)} - ${category}`);

  res.send(`
  <p>Height of ${height} & Weight of ${weight} gives you BMI of ${bmi.toFixed(2)}</p>
  `);
});

//Start the server on specified port number
//Console refers to terminal
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
