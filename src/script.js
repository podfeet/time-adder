/* eslint-disable consistent-return */
/* eslint-disable max-len */
// calcTime is defined here but called by event listener on input boxes
/* eslint-disable no-unused-vars */

// Without this I can't have my render function inside the Class
/* eslint-disable class-methods-use-this */

// without next line, can't add event listener to the input box
/* eslint-disable no-use-before-define */

/* eslint-env jquery */
/* global Mustache */

// BUG: can't seem to get the array to show up in the docs
/**
 * timeInputObject is an Object to hold an array of the IDs for the input boxes for hours, minutes and seconds in each row, along with the add/subtraction button IDs.
 * @typedef {Object} timeInput
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
    {
      hoursID: 'h-2',
      minID: 'm-2',
      secID: 's-2',
      addBtnID: 'add-2',
      subBtnID: 'sub-2',
    },
  ],
};

let rowNum = 0;

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
     * @param {string} hoursID The html ID for the hours input box for a given row
     * @param {string} minID The html ID for the minutes input box for a given row
     * @param {string} secID The html ID for the seconds input box for a given row
     * @param {string} addBtnID The html ID for the add button for a given row
     * @param {string} subBtnID The html ID for the subtraction button for a given row
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
     * @param {string} tplString - the template string
     * @param {timeInput}
     * @param {string} tplOutput - the rendered template string
     * @returns {} - not sure what to call it, but adds the click function  & subtract buttons to change the color of the buttons
     */

    renderRow() {
      //  get the template string from the script tag
      const tplString = $('#tpl_string').html();
      //  render the template string with the data
      const tplOutput = Mustache.render(tplString, timeInputObject);
      //  put the rendered template string into the placeholder div
      $('#timeRowPlaceholder').html(tplOutput);
      // add click functions to 3 and up + buttons
      for (let j = 1; j < (timeInputObject.ids.length + 1); j += 1) {
        $(`#add-${j}`).click(() => {
          // BUG: button count is weird. if 4 buttons, says 1,2,4,8
          console.log(`add button add-${j} was clicked`);
          $(`#add-${j}`).removeClass('btn-outline-primary').addClass('btn-primary');
          $(`#sub-${j}`).removeClass('btn-danger').addClass('btn-outline-danger');
        });
        $(`#sub-${j}`).click(() => {
          console.log(`sub button sub-${j} was clicked`);
          $(`#sub-${j}`).removeClass('btn-outline-danger').addClass('btn-danger');
          $(`#add-${j}`).removeClass('btn-primary').addClass('btn-outline-primary');
        });
        // adding onchange event to the input fields to run the calcTime function
        // NOTE: 'this' has to be an input, so what is this?
        // I guess I want it to be the VALUE that is being changed
        // but now I've added it in index.html so commenting out
        // $(`#h-${j}`).attr('onchange', calcTime(this));
        // $(`#m-${j}`).attr('onchange', calcTime(this));
        // $(`#s-${j}`).attr('onchange', calcTime(this));
        // Helma wrote below to try to talk to the exact ids
        // $(`#h-${j}`).attr('change', calcTime($(`#h-${j}`)));
        // $(`#m-${j}`).attr('change', calcTime($(`#m-${j}`)));
        // $(`#s-${j}`).attr('change', calcTime($(`#s-${j}`)));
      }
    }
  }
  // finish ARow Class definition

  //  makeRows creates instances of the rows and adds them to the array
  /**
   * makeRows loops through the Array timeInputObject.ids and for each entry creates an instance of the class aRow and then calls the renderRow function to actually display the input boxes and add/subtract buttons
   * @function makeRows
   * @param {Array.<timeInputObject.ids>} - The Array of IDs for h/m/s and add/sub buttons
   */
  function makeRows() {
    for (let i = 0; i < timeInputObject.ids.length; i += 1) {
      const row = new ARow(timeInputObject.ids[i]);
      row.renderRow();
    }
  }
  makeRows();
  // initialize the row number
  rowNum = 2;

  /**
   * addRow creates a new row of input boxes and add/subtract buttons. It is triggered by the onclick event handler for the Add Another Row button
   * @function addRow
   * @param {number} rowNum - The number of rows before the add a new row button was clicked
   * @returns {number} rowNum - The number of rows after the add a new row button was clicked
   */
  function addRow() {
    rowNum += 1;
    timeInputObject.ids.push({
      hoursID: `h-${rowNum}`,
      minID: `m-${rowNum}`,
      secID: `s-${rowNum}`,
      addBtnID: `add-${rowNum}`,
      subBtnID: `sub-${rowNum}`,
    });
    // console.log(timeInputObject.ids[2].hoursID); //returns h-1
    // let x = new ARow(timeInputObject.ids[rowNum - 1]);
    makeRows();
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
let totSec = 0;

/**
 * The function calcTime is triggered by the onchange event of the input fields
 * The function should start by determining which input field was changed and in which row the input field is, e.g. h-1 would be row 1.
 * calcTime accepts one parameter called input, which is the ID of the field that was changed.
 * It then parses the ID into two parts, the prefix (the 'h') and the num (the 1), storing the prefix and the num in an array called idParts. idParts[0] will be the prefix and idParts[1] will be the num.
 * Given the ID of the input field, the function will calculate the number of seconds from that ID (x3600 for hours, x60 for min, x1 for sec). It will need to add that value to any other values in the same row. So I'll need a way to store the total for the row.
 * @function calcTime
 * @param {string} input - input is the ID of the input box in which the user typed text
 */

function calcTime(input) {
  // one input box changed with an ID like h-2. I think I need to figure out who called calcTime

  // first find the ID. I need to parse it into two parts
  // the first part is the prefix (h- or m- or s-)
  // the second part is the number (1, 2, 3, etc.)
  // console.log('I got into calcTime');
  // console.log(`input is ${input}`); // w00t! this returns h-2
  const id = input;
  // console.log(`DEBUG: id is ${id}`);
  const idParts = id.split('-');
  const prefix = idParts[0];
  const num = idParts[1];
  // console.log(prefix); // returns h
  // console.log(num); // returns 2

  // NOTE: Why am I using an iterator when I know 'num' and i know the ID?
  // NOTE: after all that do I actually need to know which id changed?
  for (let i = 0; i < rowNum; i += 1) {
    const { hoursID, minID, secID } = timeInputArray.ids[i];

    // const is used because within one pass of the for loop,
    // the value of the variable is not changed
    const hVal = $(`#${hoursID}`).val();
    const mVal = $(`#${minID}`).val();
    const sVal = $(`#${secID}`).val();

    // BUG: TypeError: Right side of assignment cannot be destructured
    // BUG: Only happens if new rows have been added

    // multipled sVal * 1 to coerce it to a number
    const rowTotSec = hVal * 3600 + mVal * 60 + sVal * 1;
    console.log(`DEBUG: rowTotSec is ${rowTotSec} for row ${i}`);
    totSec += rowTotSec;
    console.log(`DEBUG: totSec is ${totSec}`);

    // BUG: rows keep adding, not just once

  // reset totSec to 0
  // totSec = 0; // nope - this makes the total only be whatever is in the row that just changed
  // rowTotSec = 0; // nope - this doesn't change anything, all rows keep adding to the total
  }
}
