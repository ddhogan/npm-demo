// ** Path Module**
// const path = require('path');
// var pathObj = path.parse(__filename);
// console.log(pathObj);

// ** OS Module**
// const os = require('os');
// let totalMemory = os.totalmem();
// console.log(`Total Memory: ${totalMemory.toExponential(2)}`);

// ** File System Module**
// const fs = require('fs');
// all the methods basically come in two flavors: async/non-blocking (the default one) and synchronous/blocking (the 'sync' one).  Generally, avoid the Sync ones.
// let files = fs.readdirSync('./');
// console.log(files);

// fs.readdir('./', function(err, files) {
//   if (err) console.log('Error', err);
//   else console.log('Result', files);
// });

// ** Events Module**
const EventEmitter = require('events');
// Note the uppercase, which is a convention denoting a class
// so in order to use any of the methods on it, it we need a new instance of that class
const emitter = new EventEmitter(); // this is an object of that EventEmitter class

// Register a listener.  Note: '.on' is the same as '.addListener'
emitter.on('messageLogged', (e) => {
  console.log('Listener called', e);
});
// the 'e', or 'arg' is whatever you want, and it'll be the second argument from the event, and can be used to pass data about the event.

// The listener needs to be registered first, then the event gets raised.  If other way around, nothing will happen.  Once the event is raised, node runs through all the listeners synchronously.

const log = require('./logger');
log('message');