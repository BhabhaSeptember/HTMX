const express = require('express');

const router = express.Router();

const dates = [
  { id: 1, day: 'Monday', date: '02/08/2024', time: '08:30am', location: 'Online Teams Meeting', agenda: 'Check progress of ongoing projects. Discuss new project ideas' },
  { id: 2, day: 'Tuesday', date: '03/08/2024', time: '09:00am', location: 'Meeting Room 7', agenda: 'Wrap up outstanding tasks' },
  { id: 3, day: 'Wednesday', date: '04/08/2024', time: '10:30am', location: 'BMW Office 3', agenda: 'Gather information regarding latest project for the client' },
  { id: 4, day: 'Thursday', date: '05/08/2024', time: '09:00am', location: 'NLC Building 2', agenda: 'Brainstorm session for new BMW project ' },
  { id: 5, day: 'Friday', date: '06/08/2024', time: '08:30am', location: 'Online Teams Meeting', agenda: 'Check progress of ongoing projects. Address issues from the week' },
];

// GET /dates
router.get('/dates', (req, res) => {
  res.render('index', { action: '', dates, date: {} });
});

// GET /dates/new
router.get('/dates/new', (req, res) => {
  if (req.headers['hx-request']) {
    res.render('form', { date: {} });
  } else {
    res.render('index', { action: 'new', dates, date: {} });
  }
});

// GET /dates/1
router.get('/dates/:id', (req, res) => {
  const { id } = req.params;
  const date = dates.find((c) => c.id === Number(id));

  if (req.headers['hx-request']) {
    res.render('date', { date });
  } else {
    res.render('index', { action: 'show', dates, date });
  }
});

// GET /dates/1/edit
router.get('/dates/:id/edit', (req, res) => {
  const { id } = req.params;
  const date = dates.find((c) => c.id === Number(id));

  if (req.headers['hx-request']) {
    res.render('form', { date });
  } else {
    res.render('index', { action: 'edit', dates, date });
  }
});

// POST /dates
router.post('/dates', (req, res) => {
  const newdate = {
    id: dates.length + 1,
    day: req.body.day,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    agenda: req.body.agenda,
    
  };

  dates.push(newdate);

  if (req.headers['hx-request']) {
    res.render('sidebar', { dates }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="afterbegin">
          <p class="flash">Added successfully!</p>
        </main>
        ${sidebarHtml}
      `;
      res.send(html);
    });
  } else {
    res.render('index', { action: 'new', dates, date: {} });
  }
});

//POST to update appointments on a given day
router.post('/dates', (req, res) => {
  const { date, time, location, agenda } = req.body;
  res.redirect('/dates');
});

// PUT /dates/1
router.put('/update/:id', (req, res) => {
  const { id } = req.params;

  const newdate = {
    id: Number(id),
    day: req.body.day,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    agenda: req.body.agenda,
  };

  const index = dates.findIndex((c) => c.id === Number(id));

  if (index !== -1) dates[index] = newdate;

  if (req.headers['hx-request']) {
    res.render('sidebar', { dates }, (err, sidebarHtml) => {
      res.render('date', { date: dates[index] }, (err, dateHTML) => {
        const html = `
          ${sidebarHtml}
          <main id="content" hx-swap-oob="true">
            <p class="flash">Update successful!</p>
            ${dateHTML}
          </main>
        `;

        res.send(html);
      });
    });
  } else {
    res.redirect(`/dates/${index + 1}`);
  }
});

// DELETE /dates/1
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = dates.findIndex((c) => c.id === Number(id));

  if (index !== -1) dates.splice(index, 1);
  if (req.headers['hx-request']) {
    res.render('sidebar', { dates }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="true">
          <p class="flash">Succesful delete!</p>
        </main>
        ${sidebarHtml}
      `;
      res.send(html);
    });
  } else {
    res.redirect('/dates');
  }
});

module.exports = router;
