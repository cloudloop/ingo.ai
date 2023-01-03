const http = require('http');
const fs = require('fs');
const path = require('path');

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
