#!/usr/bin/env node

/* eslint-disable max-len */
/* eslint-disable init-declarations */
/* eslint-env jquery */
/* global Mustache */

/**
 * @file Main entry point for the script.
 */
import calcTime from './calcTime.mjs';

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
   * addRow creates a new row of input boxes and add/subtract buttons. It is triggered by the onclick event handler for the Add Another Row button. It also adds an event handler to the last input box on the page to click the Add Another Row Button when the user hits tab
   * 
   * @function addRow
   * 
   * @returns {number} rowNum - The number of rows after the add a new row button was clicked
   */
  function addRow() {
    $('input').removeClass('lastSeconds');
    $('input').last().off('keydown');
    rowNum += 1;
    timeInputObject.ids = [{
      hoursID: `h-${rowNum}`,
      minID: `m-${rowNum}`,
      secID: `s-${rowNum}`,
      nameID: `n-${rowNum}`,
    }];
    makeRows();
    $('input').last().addClass('lastSeconds');

    // looks for keydown on input with class lastSeconds. if the keycode registered is 9 (tab) then it actually clicks the Add Another Row button (which has ID #moreTimes). It seems like this would create an infinite loop but it requires the tab key to keep it going.
    $('input.lastSeconds').on('keydown', (e) => {
      const keyCode = e.keyCode || e.which;
      if (keyCode == 9) {
        $('#moreTimes').click(); // verified this works via console
      }
    });
    return rowNum;
  }

  // click handler for the AddAnotherRow button to call addRow
  $('#moreTimes').click(() => {
    addRow();
    console.log('addRow button pushed');
  });

  // click handler to export CSV
  $('#exportCSV').click(() => {
    let csvContent = '';

    rows.forEach((rows) => {
      csvContent += row + '\r\n';
    });
    csvContent += totalRow + '\r\n';

    // display CSV in an alert
    alert(csvContent);

    // Attempt to create a new window with the CSV content (do I really need this to work?)
    // window.open returns Not allowed to load local resource: file:///Users/allison/htdocs/time-adder/Title,Hours,Minutes,Seconds%0D%0A,1,0,0%0D%0A,0,0,0%0D%0A
    // const encodedUri = encodeURI(csvContent);
    // window.open(encodedUri);
  });
});

// This will return an array with the contents of totalRow
const totalRow = calcTime(rowNum);
console.log(`DEBUG: totalRow is ${totalRow}`);

