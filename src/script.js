/* eslint-env jquery */
/* global Mustache */

/**
 * timeInputObject is an Object to hold an array of the IDs for the input boxes for hours, minutes and seconds in each row, along with the add/subtraction button IDs.
 * 
 * @typedef {object} timeInput
 * @property {Array.<{hoursID: string, minID: string, secID: string, addBtnID: string, subBtnID: string}>} ids - the HTML IDs for the input boxes for hours, minutes and seconds in each row, along with the add/subtraction button IDs
 * @param {{hoursID: string, minID: string, secID: string, addBtnID: string, subBtnID: string}} timeInput.ids
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
    },
    /*
    {
      hoursID: 'h-2',
      minID: 'm-2',
      secID: 's-2',
      addBtnID: 'add-2',
      subBtnID: 'sub-2',
    },
    */
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
     * @param {string} addBtnID - The html ID for the add button for a given row
     * @param {string} subBtnID - The html ID for the subtraction button for a given row
     */
    constructor(details) {
      this.hoursIDhours = details.hoursID;
      this.minIDmin = details.minID;
      this.secIDsec = details.secID;
      this.addBtnIDadd = details.addBtnID;
      this.subBtnIDsub = details.subBtnID;
    }
    // ****************************** //
    //  Define the Instance functions //
    // ****************************** //
    /**
     * @instance
     * @property {string} tplString - the template string from the script tag
     * @property {string} tplOutput - the rendered template string with the data
     * @param {timeInput} timeInput
     */
    renderRow() {
      //  get the template string from the script tag
      const tplString = $('#tpl_string').html();
      //  render the template string with the data
      const tplOutput = Mustache.render(tplString, timeInputObject);
      //  put the rendered template string into the placeholder div
      $('#timeRowPlaceholder').append($(tplOutput));
      // add click functions to 3 and up + buttons
      for (let j = 1; j < (timeInputObject.ids.length + 1); j += 1) {
        $(`#add-${j}`).click(() => {
          console.log(`add button add-${j} was clicked`);
          $(`#add-${j}`).removeClass('btn-outline-primary').addClass('btn-primary');
          $(`#sub-${j}`).removeClass('btn-danger').addClass('btn-outline-danger');
        });
        $(`#sub-${j}`).click(() => {
          console.log(`sub button sub-${j} was clicked`);
          $(`#sub-${j}`).removeClass('btn-outline-danger').addClass('btn-danger');
          $(`#add-${j}`).removeClass('btn-primary').addClass('btn-outline-primary');
        });
      }
    }
  }
  // finish ARow Class definition
  
  /**
   * makeRows(num) loops through the Array timeInputObject.ids and for each entry creates an instance of the class aRow and then calls the renderRow function to actually display the input boxes and add/subtract buttons
   *
   * To do: makeRows erases the values in the input boxes, so I think I need to figure out how to actually ADD rows, not replace all rows and add a new one
   * 
   * makeRows should make two rows when the page loads, but when called in addRow it should only make one more row
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
      addBtnID: `add-${rowNum}`,
      subBtnID: `sub-${rowNum}`,
    }];
    // let x = new ARow(timeInputObject.ids[rowNum - 1]);
    makeRows();
    // for (let i=0; i < timeInputObject.ids.length; i++) {
    //   console.log(`DEBUG: timeInputObject.ids[i].hoursID is ${timeInputObject.ids[i].hoursID}`);
    // }
    // console.log(`DEBUG: rowNum is ${rowNum}`);
    return rowNum;
  }

  // click handler for the AddAnotherRow button to call addRow
  // BUG: BIG BUG - adding a row erases the values in existing rows
  // NOTE: Maybe I can use rowNum in the iteration for makeRows? like i = rowNum+1?
  $('#moreTimes').click(() => {
    addRow();
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
 * 
 * It loops through the ids of all of the input boxes, and on each pass creates an Object with the IDs of the hours, minutes and seconds boxes.  It then finds the value in each input box of the current row and coerces it into a Number and stores the values in constants.
 *
 * Finally the math of this whole project occurs. For the given row of the loop, it calculates the total number of seconds in the row and stores it in the array rowTotalArray at position 'i' of the loop.
 *
 * It then uses the `Array.prototype.reduce()` method to add up all of the values in rowTotalArray and saves it to the constant totSec. totSec then needs to be parsed back into hours, minutes and seconds. calcTime  uses `Math.floor()` to round the value down to the nearest whole number while dividing by 3600, 60, and 1 respectively.
 *
 * To do: allow support for subtraction
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce Mozilla docs on reduce()}
 * @function calcTime
 * @param {timeInput} timeInput
 */
function calcTime() {
  let totSec = 0;
  for (let i = 0; i < rowNum; i += 1) {
    const id = i + 1;
    const hVal = Number($(`#h-`+id).val());
    const mVal = Number($(`#m-`+id).val());
    const sVal = Number($(`#s-`+id).val());

    rowTotalArray[i] = hVal * 3600 + mVal * 60 + sVal;
    console.log(`DEBUG: rowTotalArray[i] is ${rowTotalArray[i]}`)
    // eslint-disable-next-line max-len
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    totSec = rowTotalArray.reduce(reducer);
    // console.log(`DEBUG: Total Seconds for all rows is ${totSec}`);
    const roundHours = Math.floor(totSec / 3600);
    const roundMin = Math.floor((totSec - (roundHours * 3600)) / 60);
    const roundSec = Math.floor(totSec - (roundHours * 3600) - (roundMin * 60));
    $('#hTot').html(roundHours);
    $('#mTot').html(roundMin);
    $('#sTot').html(roundSec);
  }
}
