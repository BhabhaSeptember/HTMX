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

//Handle POST request for temperature conversion
app.post("/convert", (req, res) => {
  setTimeout(() => {
    const fahrenheit = parseFloat(req.body.fahrenheit);
    const celsius = (fahrenheit - 32) * (5 / 9);

    res.send(`
            <p>
            ${fahrenheit} degrees Fahrenheit = ${celsius.toFixed(
      2
    )} degrees Celsius
            </p>`);
  }, 2000);
});

//Starting the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
