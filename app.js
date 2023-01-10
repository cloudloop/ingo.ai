const http = require('http');
const fs = require('fs');
const path = require('path');
const supabase = require('@supabase/supabase-js')

http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // get the file path
  let filePath = path.join(
    __dirname,
    '',
    req.url === '/' ? 'index.html' : req.url
  );

  // get the file extension
  let extname = path.extname(filePath);

  // initial content type
  let contentType = 'text/html';

  // check the file extension and set content type
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // page not found
        fs.readFile(
          path.join(__dirname, '', '404.html'),
          (err, content) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf8');
          }
        );
      } else {
        // some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
}).listen(8000);

console.log('Server running at http://localhost:8000/');


const SUPABASE_URL = 'https://kiaqszjiwrstfqkmrrru.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpYXFzemppd3JzdGZxa21ycnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcyMTUzNjEsImV4cCI6MTk4Mjc5MTM2MX0.nh0Fk4oiM5JQdWF6EL1EwHluuawv1ibBEFgBqciKI9M'

let sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

console.log(SUPABASE_KEY, SUPABASE_URL)