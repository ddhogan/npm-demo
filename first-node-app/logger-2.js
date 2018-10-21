const url = 'http://mylogger.io/log'; // we're gonna send an http request to this imaginary url

const EventEmitter = require('events');
const emitter = new EventEmitter();

function log(message) {
  // Send and http request
  // for now, just want to log the message
  console.log(message);

  // Raise an event
  emitter.emit('messageLogged', { id: 1, url: 'http://localhost:3000' });
}

// url and log are both scoped to this module, they're private.

// module.exports.log = log; // the object we're exporting has a single method which is equal to our `log` function.

// module.exports.url = url;
// we could also write it like this if we want it to be known outsite this module by a different name, like "endPoint"
// module.exports.endPoint = url;
// but you don't usually need this, because it's an implementation detail

// Exporting this way means we're exporting an object, which may be good if we're trying to export multiple things, but if we just want the function, we can do 
module.exports = log;
// and then in app.js, do log(message); instead of logger.log(message);