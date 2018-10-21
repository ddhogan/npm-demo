function log(req, res, next) {
  console.log("Logging..."); //  Let's pretend we want to log every request
  next(); // go to the next function in the req-res pipeline
}

module.exports = log;