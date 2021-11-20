/* eslint-env jquery */
/* global Mustache */

let timeInputArray = {
  ids: [
    {
      hoursID: 'hours-1',
      minID: 'min-1',
      secID: 'sec-1',
      addBtnID: 'add-1',
      subBtnID: 'sub-1',
    },
    {
      hoursID: 'hours-2',
      minID: 'min-2',
      secID: 'sec-2',
      addBtnID: 'add-2',
      subBtnID: 'sub-2',
    },
  ],
};

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
    renderRow(){
      //  get the template string from the script tag
      const tplString = $('#tpl_string').html();
      //  render the template string with the data
      const tplOutput = Mustache.render(tplString, timeInputArray);
      //  put the rendered template string into the placeholder div
      $('#timeRowPlaceholder').html(tplOutput);
      // add click functions to 3 and up + buttons
      for (let j = 1; j < (timeInputArray.ids.length + 1); j += 1) {
        $(`#add-${j}`).click(function() {
          console.log(`add button add-${j} was clicked`);
          $(`#add-${j}`).removeClass('btn-outline-primary').addClass('btn-primary');
          $(`#sub-${j}`).removeClass('btn-danger').addClass('btn-outline-danger');
        });
        $(`#sub-${j}`).click(function() {
          console.log(`sub button sub-${j} was clicked`);
          $(`#sub-${j}`).removeClass('btn-outline-danger').addClass('btn-danger');
          $(`#add-${j}`).removeClass('btn-primary').addClass('btn-outline-primary');
        });
      };
    };
  };
  // finish ARow Class definition
  
  function makeRows(){
    for (let i = 0; i < timeInputArray.ids.length; i += 1) {
      const row = new ARow(timeInputArray.ids[i]);
      row.renderRow();
      };
    };
    makeRows();
    
  // initialize the row number
  let rowNum = 2; 

  function addRow() {
    // i needs to be 3 in order to push values to the array

    rowNum++; // BUG: it HAS to increment first but it fails. If I incrmeent after it works but duplicates row #2.
    timeInputArray.ids.push({
      hoursID: `hours-${rowNum}`,
      minID: `min-${rowNum}`,
      secID: `sec-${rowNum}`,
      addBtnID: `add-${rowNum}`,
      subBtnID: `sub-${rowNum}`,
    });
    // console.log(timeInputArray.ids[2].hoursID); //returns hours-1
    let x = new ARow(timeInputArray.ids[rowNum]);
    makeRows();
    console.log(`DEBUG: rowNum after addRow is ${rowNum}`)
  }
  

  // //  add click handler to the AddAnotherRow button
  $('#moreTimes').click(function() {
    addRow();
  })


});
