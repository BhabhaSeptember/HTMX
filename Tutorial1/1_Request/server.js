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

//Handle GET requests to fetch users
//(request, response objects)

// app.get("/users", (req, res)=> {
// const users = [
//     {id: 1, name: "Judith Roberts"},
//     {id:2, name: "Hannah Brown"},
//     {id:3, name: "Zeke Samuels"}
// ];

//     //response object has 'send' method
//     res.send(`
//     <h1 class="text-2xl font-bold my-4">USERS</h1>
//     <ul>
//     ${users.map((user)=> `<li>${user.name}</li>`).join("")}
//     </ul>
//     `)
// })

app.get("/users", async (req, res) => {
  setTimeout(async () => {
    const limit = +req.query.limit || 10;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
    );
    const users = await response.json();

    res.send(`
        <h1 class="text-2xl font-bold my-4">USERS</h1>
        <ul>
        ${users.map((user) => `<li>${user.name}</li>`).join("")}
        </ul>
        `);
  }, 2000);
});

//Starting the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

