const path = require('path');
const fs = require('fs');
const express = require('express');
const initSqlJs = require('sql.js');

const app = express();
const port = process.env.PORT || 3000;
const databaseFile = process.env.DATABASE_PATH || path.join(__dirname, 'data', 'golden-dream.db');
fs.mkdirSync(path.dirname(databaseFile), { recursive: true });
let db;

function saveDatabase() {
  fs.writeFileSync(databaseFile, Buffer.from(db.export()));
}

function createSchema() {
  db.run(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL CHECK(type IN ('information_request', 'restaurant_reservation', 'meeting_room_request')),
    status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'contacted', 'confirmed', 'cancelled')),
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT,
    reservation_date TEXT,
    reservation_time TEXT,
    guests TEXT,
    occasion TEXT,
    room TEXT,
    attendees TEXT,
    duration TEXT,
    catering TEXT,
    company TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS submissions_type_created_at ON submissions(type, created_at DESC);
`);
  saveDatabase();
}

app.use(express.json({ limit: '20kb' }));
app.use(express.static(__dirname, { extensions: ['html'] }));

const clean = (value, maxLength = 500) => String(value || '').trim().slice(0, maxLength);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateSubmission(body, type) {
  const submission = {
    type,
    first_name: clean(body.firstName, 100),
    last_name: clean(body.lastName, 100),
    email: clean(body.email, 254).toLowerCase(),
    phone: clean(body.phone, 50),
    subject: clean(body.subject, 150),
    message: clean(body.message, 3000),
    reservation_date: clean(body.date, 10),
    reservation_time: clean(body.time, 50),
    guests: clean(body.guests, 50),
    occasion: clean(body.occasion, 100),
    room: clean(body.room, 150),
    attendees: clean(body.attendees, 50),
    duration: clean(body.duration, 100),
    catering: clean(body.catering, 150),
    company: clean(body.company, 150)
  };

  if (!submission.email || !emailPattern.test(submission.email)) return [null, 'Please enter a valid email address.'];
  if (type === 'information_request' && (!submission.first_name || !submission.last_name || !submission.subject || !submission.message)) return [null, 'Please complete your name, enquiry type, and message.'];
  if (type === 'restaurant_reservation' && (!submission.first_name || !submission.last_name || !submission.reservation_date || !submission.reservation_time || !submission.guests)) return [null, 'Please complete all reservation details.'];
  if (type === 'meeting_room_request' && (!submission.first_name || !submission.room || !submission.reservation_date || !submission.attendees || !submission.duration)) return [null, 'Please complete all booking details.'];
  return [submission, null];
}

const insertSubmission = `
  INSERT INTO submissions (
    type, first_name, last_name, email, phone, subject, message, reservation_date,
    reservation_time, guests, occasion, room, attendees, duration, catering, company
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

app.post('/api/submissions/:type', (req, res) => {
  const allowedTypes = ['information_request', 'restaurant_reservation', 'meeting_room_request'];
  if (!allowedTypes.includes(req.params.type)) return res.status(404).json({ error: 'Unknown submission type.' });

  const [submission, error] = validateSubmission(req.body, req.params.type);
  if (error) return res.status(400).json({ error });

  db.run(insertSubmission, [
    submission.type, submission.first_name, submission.last_name, submission.email, submission.phone,
    submission.subject, submission.message, submission.reservation_date, submission.reservation_time,
    submission.guests, submission.occasion, submission.room, submission.attendees, submission.duration,
    submission.catering, submission.company
  ]);
  const id = db.exec('SELECT last_insert_rowid() AS id')[0].values[0][0];
  saveDatabase();
  return res.status(201).json({ id, message: 'Thank you — your request has been received.' });
});

async function start() {
  const SQL = await initSqlJs({ locateFile: (file) => path.join(__dirname, 'node_modules', 'sql.js', 'dist', file) });
  db = fs.existsSync(databaseFile) ? new SQL.Database(fs.readFileSync(databaseFile)) : new SQL.Database();
  createSchema();
  app.listen(port, () => console.log(`Golden Dream is running at http://localhost:${port}`));
}

start().catch((error) => {
  console.error('Could not start Golden Dream:', error);
  process.exit(1);
});
