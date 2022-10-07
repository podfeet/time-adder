/* eslint-disable jsdoc/require-returns-check */
// Math starts here
// import entered times from index-body.js
// import {rows} from './index-body.js';

// rows will look like this:
// example
// const rows = [
//   ["Title", "Hours", "Minutes", "Seconds"],
//   ["pancakes", 3, 27, 59],
//   ["waffles", 43, 3, 1]
// ];
// Initialize global variables
let roundHours = 0;
let roundMin = 0;
let leftoverSec = 0;

// define a dictionary object called ct to hold calculated times
let ct= {};

/**
 * calc uses the numbers entered into the text boxes and adds them together as seconds to get the total number of seconds. It then parses those seconds back to hh:mm:ss
 * 
 * @function calc
 * @returns {ct} - dictionary holding 3 calculated times
 * @param rows - array of data from input boxes
 */
export default function calc(rows) {
  let h = 0;
  let m = 0;
  let s = 0;
  let totSec = 0;

  for ( let i = 1; i < rows.length; i++ ) {
    h = rows[i][1];
    m = rows[i][2];
    s = rows[i][3];
    totSec += s + m*60 + h*3600;
  }

  // BUG: Math.floor doesn't work as expected on negative values
  const totSecSign = Math.sign(totSec);
  console.log(`DEBUG: totSecSign is ${totSecSign}`)

  const totSecPos = Math.abs(totSec);
  console.log(`DEBUG: totSecPos is ${totSecPos}`)
  
  const roundHoursPos = Math.floor(totSecPos / 3600);
  roundHours = totSecSign * roundHoursPos;

  const roundMinPos = Math.floor((totSecPos - (roundHoursPos * 3600)) / 60);
  roundMin = totSecSign * roundMinPos;

  const leftoverSecPos = (totSecPos - (roundHoursPos * 3600) - (roundMinPos * 60));
  leftoverSec = totSecSign * leftoverSecPos;
  
  ct = {roundHours, roundMin, leftoverSec};
  return ct;
}
