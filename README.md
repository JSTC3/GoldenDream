# Golden Dream

The site is organized around a public web root:

- `public/` contains the home, utility, and grouped content pages;
- `public/assets/` contains shared CSS, JavaScript, and images;
- `server.js`, `scripts/`, and `data/` stay outside the browser-facing files.

## Request storage

This site now stores these submissions in a local SQLite database:

- contact and information requests;
- restaurant reservation requests;
- meeting-room booking requests.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`. The database is created automatically at `data/golden-dream.db` and is excluded from Git.

## View stored requests

Run:

```bash
npm run submissions
```

The database is deliberately only writable through the form endpoint; it is not exposed publicly. For production, run this Node server behind HTTPS and use a managed PostgreSQL database if multiple server instances are needed.
