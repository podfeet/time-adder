/* eslint-disable class-methods-use-this */
/* eslint-env jquery */
/* global Mustache */

// import the module timeMath
// BUG: import statement below returns:
// "SyntaxError: Unexpected token '{'. import call expects exactly one
// argument." Online suggestions say the script must be called with type="module"
// import timeMath from './timeMath.mjs';
// console.log(`DEBUG: x is ${x}`)

const timeInputArray = {
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
   * never know what to write here
   */
  class ARow {
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

    // renderRow actually creates the html with the Mustache
    renderRow() {
      //  get the template string from the script tag
      const tplString = $('#tpl_string').html();
      //  render the template string with the data
      const tplOutput = Mustache.render(tplString, timeInputArray);
      //  put the rendered template string into the placeholder div
      $('#timeRowPlaceholder').html(tplOutput);
      // add click functions to 3 and up + buttons
      for (let j = 1; j < (timeInputArray.ids.length + 1); j += 1) {
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
        // adding onchange event to the input fields to run the calcTime function
        $(`#h-${j}`).attr('change', calcTime($(`#h-${j}`)));
        $(`#m-${j}`).attr('change', calcTime($(`#m-${j}`)));
        $(`#s-${j}`).attr('change', calcTime($(`#s-${j}`)));
      }
    };
  }
  // finish ARow Class definition

  //  makeRows creates instances of the rows and adds them to the array
  function makeRows() {
    for (let i = 0; i < timeInputArray.ids.length; i += 1) {
      const row = new ARow(timeInputArray.ids[i]);
      row.renderRow();
    }
  }
  makeRows();
  // initialize the row number
  rowNum = 2;

  // addRow creates a new row of input boxes and is
  // triggered by the click function for the Add Another Row button
  function addRow() {
    rowNum += rowNum;
    timeInputArray.ids.push({
      hoursID: `h-${rowNum}`,
      minID: `m-${rowNum}`,
      secID: `s-${rowNum}`,
      addBtnID: `add-${rowNum}`,
      subBtnID: `sub-${rowNum}`,
    });
    // console.log(timeInputArray.ids[2].hoursID); //returns h-1
    // let x = new ARow(timeInputArray.ids[rowNum - 1]);
    makeRows();
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
// BUG: calcTime is called when the page loads
// Should only run on change event
// NOTE look here for help https://stackoverflow.com/questions/1628826/how-to-add-an-onchange-event-to-a-select-box-via-javascript
function calcTime() {
  // one input box changed
  // the input box has an ID like h-2
  // first find the ID. I need to parse it into two parts
  // the first part is the prefix (h- or m- or s-)
  // the second part is the number (1, 2, 3, etc.)
  console.log('I got into calcTime');
  const { id } = this;
  console.log(`DEBUG: id is ${id}`);
  const idParts = id.split('-');
  const prefix = idParts[0];
  const num = idParts[1];
  console.log(prefix); // returns h
  console.log(num); // returns 2

  // console.log ($this.attr('id'));
  // console.log($this.val());

  for (let i = 0; i < rowNum; i += 1) {
    const { hoursID, minID, secID } = timeInputArray.ids[i];

    // const is used because within one pass of the for loop,
    // the value of the variable is not changed
    const hVal = $(`#${hoursID}`).val();
    const mVal = $(`#${minID}`).val();
    const sVal = $(`#${secID}`).val();

    // console.log(`DEBUG: hVal is ${hVal}`);
    // console.log(`DEBUG: mVal is ${mVal}`);
    // console.log(`DEBUG: sVal is ${sVal}`);

    // this is where I will call the module timeMath
    // multipled sVal * 1 to force it to be a number

    const rowTotSec = hVal * 3600 + mVal * 60 + sVal * 1;
    totSec += rowTotSec;
    console.log(`DEBUG: totSec is ${totSec}`);

    // reset totSec to 0
    // totSec = 0; // nope - this makes the total only be whatever is in the row that just changed
    // rowTotSec = 0; // nope - this doesn't change anything, all rows keep adding to the total
    // timeMath(hVal,mVal,sVal);
    // console.log(`DEBUG: rowTotSec is ${rowTotSec}`)
  }
}
