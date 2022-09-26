// Math starts here
// import entered times from index-body.js
import {rows} from './index-body.js';

// rows will look like this:
// [
//    ["Title", "Hours", "Minutes", "Seconds"],
//    [pancakes, 3, 27, 59],
//    [waffles, 43, 3, 1]
// ]

// example
const rows = [
  ["Title", "Hours", "Minutes", "Seconds"],
  ["pancakes", 3, 27, 59],
  ["waffles", 43, 3, 1]
];

let hVal = 0;
let mVal = 0;
let sVal = 0;
let totSec = 0;
for ( i = 1; i < rows.length; i++ ) {
  hVal = rows[i][1];
  mVal = rows[i][2];
  sVal = rows[i][3]; 
  totSec += sVal + mVal*60 + hVal*3600;
 
}
console.log(totSec);

// I don't have rowTotalArray[i]. I have to build it
// rowTotalArray[i] = hVal * 3600 + mVal * 60 + sVal;
/* Array.prototype.reduce(): The reducer walks through the array 
element-by-element, at each step adding the current array value 
to the result from the previous step 
(this result is the running sum of all the previous steps) — until 
there are no more elements to add. */
// const reducer = (previousValue, currentValue) => previousValue + currentValue;
// totSec = rowTotalArray.reduce(reducer);
const roundHours = Math.floor(totSec / 3600);
const roundMin = Math.floor((totSec - (roundHours * 3600)) / 60);
const leftoverSec = (totSec - (roundHours * 3600) - (roundMin * 60));
// Math ends here
export {roundHours, roundMin, leftoverSec};
