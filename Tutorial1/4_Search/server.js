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


// const contacts = [
//     {name: "Anne de Villiers", email: "anne@isidingo.com"},
//     {name: "Bruce Willis", email: "bruce@willis.com"},
//     {name: "Chris Brown", email: "chris@brown.com"},
//     {name: "Denzel Washington", email: "denzel@washington.com"},
//     {name: "Earl Gray", email: "earl@myname.com"}
// ]
// //Handle POST request for contact search
// app.post("/search", (req, res) => {
// const searchTerm = req.body.search.toLowerCase();

// if(!searchTerm) {
//     return res.send("<tr></tr>");
// }

// const searchResults = contacts.filter(contact => {
//     const name = contact.name.toLowerCase();
//     const email = contact.email.toLowerCase();

//     return name.includes(searchTerm) || email.includes(searchTerm)
// });

// setTimeout(() => {
//     const searchResultHtml = searchResults.map(contact => `
//     <tr>
//     <td><div class="my-4 p-2">${contact.name}</div></td>
//     <td><div class="my-4 p-2">${contact.email}</div></td>

//     </tr>
//     `).join("");

//     res.send(searchResultHtml);
// }, 1000);
// })


//Handle POST request for contact search from jsonplaceholder
app.post("/search/api", async (req, res) => {
  const searchTerm = req.body.search.toLowerCase();

  if (!searchTerm) {
    return res.send("<tr></tr>");
  }

  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const contacts = await response.json();

  const searchResults = contacts.filter((contact) => {
    const name = contact.name.toLowerCase();
    const email = contact.email.toLowerCase();

    return name.includes(searchTerm) || email.includes(searchTerm);
  });

  setTimeout(() => {
    const searchResultHtml = searchResults
      .map(
        (contact) => `
        <tr>
        <td><div class="my-4 p-2">${contact.name}</div></td>
        <td><div class="my-4 p-2">${contact.email}</div></td>
        </tr>
        `
      )
      .join("");

    res.send(searchResultHtml);
  }, 1000);
});


//Starting the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
