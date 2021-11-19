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

      // this.addRow();
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

    putRowUp() {
      this.renderRow();
      // i++;
    }
  };
  // finish ARow Class definition
  
  // initialize the row numbers (I know, it should have started at 0)
  let i = 1; // without this, "TypeError: undefined is not an object (evaluating 'details.hoursID')"
  function makeRows(){
    const row = new ARow(timeInputArray.ids[i]);
    row.putRowUp();
  }
  function makeInitialRows(){
    for (let j = 0; j < 2; j += 1) { // make 2 rows
      makeRows();
    }
  }
  makeInitialRows();

  // i is 2 at this point
  // i needs to be 3 in order to push values to the array
  
  function addRow() {
    i++; // increment i for the two existing rows
    console.log(`DEBUG: i in addRow is ${i}`)
    timeInputArray.ids.push({
      hoursID: `hours-${i}`,
      minID: `min-${i}`,
      secID: `sec-${i}`,
      addBtnID: `add-${i}`,
      subBtnID: `sub-${i}`,
    });
    let x = new ARow(timeInputArray.ids[i]);
    makeRows();
  }
  

  // //  add click handler to the AddAnotherRow button
  $('#moreTimes').click(function() {
    addRow();
  })


});
