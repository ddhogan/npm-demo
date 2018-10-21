const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World');
    res.end();
  }

  if (req.url === '/api/courses'){
    res.write(JSON.stringify(['course 1', 'course 2', 'course 3']));
    res.end();
  }
});
// server is an even emitter, so we have the 'on'/'addListener', 'emit', and so on
// server.on('connection', (socket) => {
//   console.log('New connection...');
// });

// the name of this event is in the docs
server.listen(3000);
console.log('Listening on port 3000...');