/* eslint-disable no-compare-neg-zero */
/* eslint-disable max-len */
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

// jquery
import $ from 'jquery';

// import is-it-check library
import is from 'is-it-check';

// Initialize global variables
let roundHours = 0;
let roundMin = 0;
let leftoverSec = 0;

// define a dictionary object called ct to hold calculated times
let ct= {};

/**
 * Helper function to allow some symbols to be accepted as zero
 * If input is minus, dot, or space, turn them into zeroes
 * Ternary operation to change - and . and space to zero if entered, else use real value
 * 
 * @param {*} x 
 * @returns {number}
 */
function changeToZero(x) {
  if (is.string(x)) { // use is-it-check library
    x = x.trim();
    x = ((x == '-') || (x == '.') || (x == '')) ? 0 : x;
  }
  return x;
}

/**
 * Calculates the total time in hours, minutes, and seconds from the given rows of time data.
 * 
 * @function calc
 * @param {Array} rows - Array of time data where each row contains title, hours, minutes, and seconds.
 * @returns {object} - An object containing the calculated total hours, minutes, and seconds (ct).
 */
export default function calc(rows) {
  let h = 0;
  let m = 0;
  let s = 0;
  let totSec = 0;

  for ( let i = 1; i < rows.length; i++ ) {
    h = changeToZero(rows[i][1]);
    m = changeToZero(rows[i][2]);
    s = changeToZero(rows[i][3]);
   
    // Check for minus button to reverse the signs
    if ($(`#sub-`+[i]).hasClass('active')) {
      h = -h;
      m = -m;
      s = -s;
    }
    // Multiply sec x 1 so '7' becomes a number not a string
    totSec += 1*s + m*60 + h*3600;
  }

  // Can't use Math.floor from the outset doesn't work as expected on negative values
  // math.floor() rounds down the opposite of normal roundDown in Excel.
  // If  totSec/3600 is -4:10
  // In Excel that rounds down to -4 (expected)
  // math.floor() rounds it down to -5
  // Instead I'll start with the absolute value of totSec and after all calculations, assign the sign of totSec

  // First get the sign of the value in totSec
  // The Math.sign() static method returns 1 or -1, indicating the sign of the number passed as argument. If the input is 0 or -0, it will be returned as-is.
  const totSecSign = Math.sign(totSec);

  // The Math.abs() static method returns the absolute value of a number.
  // Find positive value of totSec
  const totSecPos = Math.abs(totSec);
  
  // The Math.floor() static method always rounds down and returns the largest integer less than or equal to a given number.
  // Find positive value of roundHours
  const roundHoursPos = Math.floor(totSecPos / 3600);
  // Apply the sign to get the real roundHours, but not -0
  roundHours = totSecSign * roundHoursPos;
  if (roundHours == -0) {
    roundHours = 0;
  }

  // Find positive value of roundMin
  const roundMinPos = Math.floor((totSecPos - (roundHoursPos * 3600)) / 60);
  // Apply the sign to get the real roundMin
  roundMin = totSecSign * roundMinPos;
  if (roundMin == -0) {
    roundMin = 0;
  }

  // Find positive value of leftoverSec
  // parseFloat required because these floating point calcs have precision errors. 1.1 hours returned 1 hour, 6 min, and 4.547473508864641e-13 seconds! picked 2 decimal places to cap it.
  const leftoverSecPos = parseFloat((totSecPos - (roundHoursPos * 3600) - (roundMinPos * 60))).toFixed(2);
  // Apply the sign to get the real leftoverSec
  leftoverSec = totSecSign * leftoverSecPos;
  if (leftoverSec == -0) {
    leftoverSec = 0;
  }
  
  ct = {roundHours, roundMin, leftoverSec};
  return ct;
}
