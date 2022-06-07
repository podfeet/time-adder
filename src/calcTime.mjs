/* eslint-disable max-len */
/* eslint-disable init-declarations */
/* eslint-env jquery */

/**
 * calcTime calculates the total number of seconds from all of the rows and returns an array of the total hours/min/seconds
 * The function calcTime is triggered by the onchange event of the input fields.
 * Since there's no form submittal, data validation needs to also be triggered by the oninput event of the input fields. The function will check the data as entered for h, m, s and if invalid, add the is-invalid class which will display the error message. If valid it will remove the is-invalid class and erase the error message (or never display it in the first place)
 * It loops through the ids of all of the input boxes, and on each pass creates an Object with the IDs of the hours, minutes and seconds boxes.  It then finds the value in each input box of the current row and coerces it into a Number and stores the values in constants.
 * Finally the math of this whole project occurs. For the given row of the loop, it calculates the total number of seconds in the row and stores it in the array rowTotalArray at position 'i' of the loop.
 * It then uses the `Array.prototype.reduce()` method to add up all of the values in rowTotalArray and saves it to the constant totSec. totSec then needs to be parsed back into hours, minutes and seconds. calcTime  uses `Math.floor()` to round the value down to the nearest whole number while dividing by 3600 for hours, and 60 for minutes. leftoverSec is the remaining seconds in floating point form.
 * 
 * @module calcTime
 * @param {number} rowNum - integer total number of rows
 * @returns {Array} totalRow - array of hours, minutes, seconds
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce Mozilla docs on reduce()}
 */
export default function calcTime(rowNum) {
  let totSec = 0;

  // Store rows into an array to later be exported as a CSV file
  // I need it to work on every keypress, but it should _replace_ the value if it changes.
  // the titles are in [0], so test to see if a row exists yet for id (since it's i+1)
  // Initialize two arrays - one to hold all of the values of the rows as they're created, which will be used to export a CSV file and one to hold the total value of the summed rows. The totalRowArray will be populated by the calcTime function.

  const rows = [
    ['Title', 'Hours', 'Minutes', 'Seconds'],
  ];
  for (let i = 0; i < rowNum; i += 1) {
    const id = i + 1;
    // create some simple variables for clarity
    const $h = $(`#h-`+id);
    const $m = $(`#m-`+id);
    const $s = $(`#s-`+id);
    const $n = $(`#n-`+id);
    // form validation
    if ($h.is(':invalid')) {
      $h.addClass('is-invalid');
    } else {
      $h.removeClass('is-invalid');
    }
    if ($m.is(':invalid')) {
      $m.addClass('is-invalid');
    } else {
      $m.removeClass('is-invalid');
    }
    if ($s.is(':invalid')) {
      $s.addClass('is-invalid');
    } else {
      $s.removeClass('is-invalid');
    }

    const hVal = Number($h.val());
    const mVal = Number($m.val());
    const sVal = Number($s.val());
    const rowName = $n.val();

    if (rows[id]) {
      (rows.splice(id, 1, [rowName, hVal, mVal, sVal]));
    } else {
      rows.push([rowName, hVal, mVal, sVal]);
    }
    const rowTotalArray = [];
    rowTotalArray[i] = hVal * 3600 + mVal * 60 + sVal;
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    totSec = rowTotalArray.reduce(reducer);
    const roundHours = Math.floor(totSec / 3600);
    const roundMin = Math.floor((totSec - (roundHours * 3600)) / 60);
    const leftoverSec = (totSec - (roundHours * 3600) - (roundMin * 60));

    // Assign total values to the HTML IDs for the totals
    $('#hTot').html(roundHours);
    $('#mTot').html(roundMin);
    $('#sTot').html(leftoverSec);
    // NOTE: If I return rows here, then how do I get to it in the export?
  }
  // Capture text values of the total row to be used in the export CSV function
  const Total = 'Total';
  const hTotVal = $('#hTot').text();
  const mTotVal = $('#mTot').text();
  const sTotVal = $('#sTot').text();
  const totalRow = [Total, hTotVal, mTotVal, sTotVal];
  return {totalRow, rows};
}
