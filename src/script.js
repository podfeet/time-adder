/* eslint-env jquery */
/* global Mustache */

/**
 * timeInputObject is an Object to hold an array of the IDs for the input boxes for hours, minutes and seconds in each row, along with an optional name for the row.
 * 
 * @typedef {object} timeInputObject
 * @property {Array.<{hoursID: string, minID: string, secID: string, nameID: string}>} ids - the HTML IDs for the input boxes for hours, minutes and seconds in each row, along with the name for the row
 * @param {{hoursID: string, minID: string, secID: string, nameID: string}} timeInput.ids
 */
const timeInputObject = {
  /**
   * @type {Array.<timeInputObject.ids>}
   */
  ids: [
    {
      hoursID: 'h-1',
      minID: 'm-1',
      secID: 's-1',
      addBtnID: 'add-1',
      subBtnID: 'sub-1',
      nameID: 'n-1',
    },
  ],
};

// initialize the row number
let rowNum = 0;

// initialize values for total hours, minutes and seconds to zero
$('#hTot').val(0);
$('#mTot').val(0);
$('#sTot').val(0);

// Document Ready Handler
$(() => {
  // ****************************** //
  //  Define the Class //
  // ****************************** //
  /**
   * @class aRow - a class to hold the data for a row
   */
  class ARow {
    /**
     * @constructs
     * @param {string} details
     * @param {string} hoursID - The html ID for the hours input box for a given row
     * @param {string} minID - The html ID for the minutes input box for a given row
     * @param {string} secID - The html ID for the seconds input box for a given row
     * @param {string} name - the name that will be stored for the row of values
     */
    constructor(details) {
      this.hoursIDhours = details.hoursID;
      this.minIDmin = details.minID;
      this.secIDsec = details.secID;
      this.nameIDname = details.nameID;
    }
    // ****************************** //
    //  Define the Instance functions //
    // ****************************** //
    /**
     * @instance
     * @property {string} tplString - the template string from the script tag
     * @property {string} tplOutput - the rendered template string with the data
     * @param {timeInputObject} timeInputObject
     */
    renderRow() {
      //  get the template string from the script tag
      const tplString = $('#tpl_string').html();
      //  render the template string with the data
      const tplOutput = Mustache.render(tplString, timeInputObject);
      //  put the rendered template string into the placeholder div
      $('#timeRowPlaceholder').append($(tplOutput));
    }
  }
  // finish ARow Class definition
  
  /**
   * makeRows(num) loops through the Array timeInputObject.ids and for each entry creates an instance of the class aRow and then calls the renderRow function to actually display the input boxes
   * 
   * @function makeRows
   * @property {Array.<timeInputObject.ids>} timeInputObject.ids - The Array of IDs for h/m/s and add/sub buttons
   */
  function makeRows() {
    for (let i = 0; i < timeInputObject.ids.length; i += 1) {
      const row = new ARow(timeInputObject.ids[i]);
      row.renderRow();
    }
  }
  makeRows();
  rowNum = timeInputObject.ids.length;
  addRow();

  /**
   * addRow creates a new row of input boxes and add/subtract buttons. It is triggered by the onclick event handler for the Add Another Row button
   * 
   * @function addRow
   * @returns {number} rowNum - The number of rows after the add a new row button was clicked
   */
  function addRow() {
    rowNum += 1;
    timeInputObject.ids = [{
      hoursID: `h-${rowNum}`,
      minID: `m-${rowNum}`,
      secID: `s-${rowNum}`,
      nameID: `n-${rowNum}`,
    }];
    // let x = new ARow(timeInputObject.ids[rowNum - 1]);
    makeRows();
    // for (let i=0; i < timeInputObject.ids.length; i++) {
    //   console.log(`DEBUG: timeInputObject.ids[i].nameID is ${timeInputObject.ids[i].nameID}`);
    // }
    // console.log(`DEBUG: rowNum is ${rowNum}`);
    return rowNum;
  }

  // click handler for the AddAnotherRow button to call addRow
  $('#moreTimes').click(() => {
    addRow();
  });

  // console.log(`DEBUG: after addRow() the first time, rowNum = ${rowNum}`);
// BUG: this works on the last row but doesn't execute the tab, and the tab doesn't work on the next row
  $('#timeRowPlaceholder').on('keydown', `#s-${rowNum}`, (e) => {
    const keyCode = e.keyCode || e.which;
  
    if (keyCode == 9) {
      addRow();
    }
  });
});

// Loop through the ids.length because it's keeping track
// of how many rows exist (values have not been created yet)
// This function must be in global scope (outside of the
// document ready handler or else the html doesn't know it exists)
// initialize the total seconds value in the global scope
// let totSec = 0;
const rowTotalArray = [];

/**
 * The function calcTime is triggered by the onchange event of the input fields.
 * Since there's no form submittal, data validation needs to also be triggered by the oninput event of the input fields. The function will check the data as entered for h, m, s and if invalid, add the is-invalid class which will display the error message. If valid it will remove the is-invalid class and erase the error message (or never display it in the first place)
 * It loops through the ids of all of the input boxes, and on each pass creates an Object with the IDs of the hours, minutes and seconds boxes.  It then finds the value in each input box of the current row and coerces it into a Number and stores the values in constants.
 * Finally the math of this whole project occurs. For the given row of the loop, it calculates the total number of seconds in the row and stores it in the array rowTotalArray at position 'i' of the loop.
 * It then uses the `Array.prototype.reduce()` method to add up all of the values in rowTotalArray and saves it to the constant totSec. totSec then needs to be parsed back into hours, minutes and seconds. calcTime  uses `Math.floor()` to round the value down to the nearest whole number while dividing by 3600 for hours, and 60 for minutes. leftoverSec is the remaining seconds in floating point form.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce Mozilla docs on reduce()}
 * @function calcTime
 * @param {timeInputObject} timeInputObject
 */
function calcTime() {
  let totSec = 0;
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

    // TODO:  change the array to have [0][1] so the name is in 0 and the total val is in 1? Why not store the original values too if this would be a fun CSV file?

    rowTotalArray[i] = hVal * 3600 + mVal * 60 + sVal;
    // console.log(`DEBUG: rowTotalArray[i] is ${rowTotalArray[i]}`);
    // eslint-disable-next-line max-len
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    totSec = rowTotalArray.reduce(reducer);
    // console.log(`DEBUG: Total Seconds for all rows is ${totSec}`);
    const roundHours = Math.floor(totSec / 3600);
    const roundMin = Math.floor((totSec - (roundHours * 3600)) / 60);
    const leftoverSec = (totSec - (roundHours * 3600) - (roundMin * 60));
    $('#hTot').html(roundHours);
    $('#mTot').html(roundMin);
    $('#sTot').html(leftoverSec);
  }
}
