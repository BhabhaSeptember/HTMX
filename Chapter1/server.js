import express from "express";

//Initialize express and save to const to get access to express methods
const app = express();

//Make the arg a static file to serve HTML files from it
app.use(express.static("public"));
 
//Parse URL encoded bodies(as sent by HTML forms)
// i.e. reverse url encoding to convert encoded characters back to their
// original form
app.use(express.urlencoded({ extended: true }));


//Parse JSON bodies(as sent by API clients)
//To process data sent in JSON format
app.use(express.json());

//Handle GET request to fetch users
// app.get("/users", (req, res) => {
//   const users = [
//     { id: 1, name: "Bhabha September" },
//     { id: 2, name: "Akhona Mavundla" },
//     { id: 3, name: "Shannon Woods" },
//   ];

// NOTE: join method concatenates all elements of array to single string
// argument of join method is the separator i.e. here it is a space
app.get("/users", async (req, res) => {
  setTimeout(async () => {
    const limit = +req.query.limit || 10; //+ converts from string to number
    // const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
    );
    const users = await response.json();
    res.send(`
    <h2>Users</h2>
    <ul class="list-group>
    ${users
      .map((user) => `<li class="list-group-item">${user.name}</li>`)
      .join("")}  
    </ul>`);
  }, 2000);
});

//Start the server on specified port number
//Console refers to terminal
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
