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

//*********************************************************************************************/
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

//*********************************************************************************************/
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


//*********************************************************************************************/
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

//*********************************************************************************************/
//Handle POST request for email validation
app.post("/contact/email", (req, res) => {
  const submittedEmail = req.body.email;
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  const isValid = {
    message: "That email is Valid",
    class: "text-green-700"
  };

  const isInvalid = {
    message: "Please enter a valid email address",
    class: "text-red-700"
  };

  if (!emailRegex.test(submittedEmail)) {
    return res.send(
      `
      <div 
      class="mb-4" 
      hx-target="this" 
      hx-swap="outerHTML"
      >
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
          >Email Address</label
        >
        <input
          name="email"
          hx-post="/contact/email"
          class="border rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
          type="email"
          id="email"
          value="${submittedEmail}"
          required
        />
        <div class="${isInvalid.class}">${isInvalid.message}</div>
      </div>
      `
    )
  } else {
    return res.send(
      `
      <div 
      class="mb-4" 
      hx-target="this" 
      hx-swap="outerHTML"
      >
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
          >Email Address</label
        >
        <input
          name="email"
          hx-post="/contact/email"
          class="border rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
          type="email"
          id="email"
          value="${submittedEmail}"
          required
        />
        <div class="${isValid.class}">${isValid.message}</div>
      </div>
      `
)};
});

//*********************************************************************************************/

// Handle GET request for profile edit
app.get('/profile/:id/edit', (req, res) => {
  // You can send an HTML form for editing here
  res.send(`
  <div
  class="container mx-auto py-8 max-w-lg"
  hx-target="this"
  hx-swap="outerHTML"
>
<form hx-put="/profile/1" hx-target="this" hx-swap="outerHTML">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <div class="mb-4">
        <label for="name" class="text-lg font-semibold">Name</label>
        <input type="text" id="name" name="name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400" placeholder="Update your name here...">
      </div>
      <div class="mb-4">
        <label for="bio" class="text-lg font-semibold">Bio</label>
        <textarea id="bio" name="bio" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400" rows="6" placeholder="Update your bio here..."></textarea>
      </div>
      <div class="mt-6">
      <button type="submit" class="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-600">Save Changes</button>
      <button type="button" hx-get="/profile.html" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg ml-2 hover:bg-gray-400">Cancel</button>
    </div>
    </div>
  </form>
</div>
  `);
});

// Handle PUT request for editing
//NOTE: xss() is a function used to sanitize or clean user input to protect against Cross-Site Scripting (XSS) attacks.
//The xss() function is typically used to strip out or escape any potentially harmful content from user inputs,
// ensuring that the data is safe to render on a web page
app.put('/profile/:id', (req, res) => {
  const name = xss(req.body.name);
  const bio = xss(req.body.bio);

  // Send the updated profile back
  res.send(`
  <div
  class="container mx-auto py-8 max-w-lg"
  hx-target="this"
  hx-swap="outerHTML"
>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-4">${name}</h1>
    <p class="text-gray-700">
      ${bio}
    </p>

    <button
      hx-get="/profile/1/edit"
      class="bg-indigo-700 text-white font-bold w-full py-2 px-4 rounded-lg mt-4 hover:bg-indigo-600"
    >
      Click To Edit
    </button>
  </div>
</div>
  `);
});
//Starting the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
