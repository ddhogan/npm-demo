const EventEmitter = require('events');

const Logger = require('./logger-3');
const logger = new Logger;

// Register a listener.  Note: '.on' is the same as '.addListener'
logger.on('messageLogged', (e) => {
  console.log('Listener called', e);
});

logger.log('hey message!');