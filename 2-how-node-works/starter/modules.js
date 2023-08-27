// console.log(arguments);
// console.log(require('module').wrapper);

//module.exports
const Cal = require('./test-module-1');
const calc1 = new Cal();
console.log(calc1.add(2,5));

//exports
const calc2 = require('./test-module-2');
console.log(calc2.multiply(5,2));

//caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();