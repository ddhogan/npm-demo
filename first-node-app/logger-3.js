const url = 'http://mylogger.io/log'; // we're gonna send an http request to this imaginary url

const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {  // now we refer to this function as a method, and remove the 'function' keyword
    // Send an http request
    console.log(message);
  
    // Raise an event
    this.emit('messageLogged', { id: 1, url: 'http://localhost:3000' });
  }
}

module.exports = Logger;