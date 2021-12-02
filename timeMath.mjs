/** @module timeMath */

//  import the needed modules (none)

/**
 * A function to add and subtract elapsed time and return the total
 * @example
 * Given inputs of hVal, mVal and sVal, the function will return the total number of seconds
 * @function timeMath.add
 */

export function timeMath() {
  
  rowTotalSec = hVal*3600+mVal*60+sVal*1;
  totalSec = totalSec + rowTotalSec;
  console.log(`DEBUG: totalSec is ${totalSec}`)
}