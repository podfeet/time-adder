// Math starts here
// import entered times from index-body.js
import {rows} from './index-body.js';
// console.log('I tried to run timeMath.js') // it gets this far
// rows will look like this:
// console.log(rows); // this does not work

// example
// const rows = [
//   ["Title", "Hours", "Minutes", "Seconds"],
//   ["pancakes", 3, 27, 59],
//   ["waffles", 43, 3, 1]
// ];

let h = 0;
let m = 0;
let s = 0;
let totSec = 0;

for ( let i = 1; i < rows.length; i++ ) {
  h = rows[i][1];
  m = rows[i][2];
  s = rows[i][3];
  totSec += s + m*60 + h*3600;
  console.log(`DEBUG: totSec is ${totSec}`);
}
console.log(totSec);
console.log('I got past totSec calc in timeMath.js') // it doesn't get this far

// BUG: Math.floor doesn't work as expected on negative values
const roundHours = Math.floor(totSec / 3600);
const roundMin = Math.floor((totSec - (roundHours * 3600)) / 60);
const leftoverSec = (totSec - (roundHours * 3600) - (roundMin * 60));
// Math ends here
export {roundHours, roundMin, leftoverSec};
