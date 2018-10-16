var _ = require('underscore');
// by convention, we import Underscore as _

// where node looks for the package:
// 1. Core Module (if just in quotes)
// 2. File or folder (if './') and it will look in there for index.js
// 3. node_modules

let result = _.contains([1,2,3], 2);
console.log('The result is', result);