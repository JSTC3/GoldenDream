const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const databaseFile = process.env.DATABASE_PATH || path.join(__dirname, '..', 'data', 'golden-dream.db');

async function listSubmissions() {
  if (!fs.existsSync(databaseFile)) {
    console.log('No submissions have been stored yet.');
    return;
  }

  const SQL = await initSqlJs({ locateFile: (file) => path.join(__dirname, '..', 'node_modules', 'sql.js', 'dist', file) });
  const db = new SQL.Database(fs.readFileSync(databaseFile));
  const result = db.exec('SELECT id, type, status, first_name, last_name, email, reservation_date, created_at FROM submissions ORDER BY id DESC');
  console.table((result[0]?.values || []).map((row) => Object.fromEntries(result[0].columns.map((column, index) => [column, row[index]]))));
}

listSubmissions().catch((error) => {
  console.error('Could not read submissions:', error.message);
  process.exit(1);
});
