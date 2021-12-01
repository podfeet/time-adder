/* eslint-env jquery */
/* global Mustache */

let timeInputArray = {
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
  values: [],
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

    // renderRow actually creates the html with the Mustache
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
        // adding onchange event to the input fields to run the addValues function
        $(`#h-${j}`).attr("onchange", "addValues('this');");
        $(`#m-${j}`).attr("onchange", "addValues('this');");
        $(`#s-${j}`).attr("onchange", "addValues('this');");

      };
    };
  };
  // finish ARow Class definition
  
  //  makeRows creates isntances of the rows and adds them to the array
  function makeRows(){
    for (let i = 0; i < timeInputArray.ids.length; i += 1) {
      const row = new ARow(timeInputArray.ids[i]);
      row.renderRow();
      };
    };
    makeRows();
    
  // initialize the row number
  let rowNum = 2; 
  
  // addRow creates a new row of input boxes and is triggered by the click function for the Add Another Row button
  function addRow() {
    rowNum++; 
    timeInputArray.ids.push({
      hoursID: `h-${rowNum}`,
      minID: `m-${rowNum}`,
      secID: `s-${rowNum}`,
      addBtnID: `add-${rowNum}`,
      subBtnID: `sub-${rowNum}`,
    });
    // console.log(timeInputArray.ids[2].hoursID); //returns h-1
    let x = new ARow(timeInputArray.ids[rowNum-1]);
    makeRows();
  }
  
  // click handler for the AddAnotherRow button to call addRow
  $('#moreTimes').click(function() {
    addRow();
  })

  // Loop through the ids.length because it's keeping track of how many rows exist (values have not been created yet?)
  function addValues() {
    for (i = 0; i < (timeInputArray.ids.length); i++) {
      let hoursID = timeInputArray.ids[i].hoursID;
      let minID = timeInputArray.ids[i].minID;
      let secID = timeInputArray.ids[i].secID;

      let hVal = $(`#${hoursID}`).val();
      let mVal = $(`#${minID}`).val();
      let sVal = $(`#${secID}`).val();

      // console.log(`DEBUG: hVal is ${hVal}`);
      // console.log(`DEBUG: mVal is ${mVal}`);
      // console.log(`DEBUG: sVal is ${sVal}`);

      rowTotalSec = hVal*3600+mVal*60+sVal*1;
      console.log(`DEBUG: rowTotalSec is ${rowTotalSec}`) // returns 36601 instead of 3661


      // timeInputArray.values.push({
      //   h: $(`#${h}`).val(),
      //   m: $(`#${m}`).val(),
      //   s: $(`#${sec}`).val(),
      // }) 
      // console.log(timeInputArray.values[i]);
      // let total = timeInputArray.values.h*3600+timeInputArray.values.m*60+timeInputArray.values.s;
      // console.log(total);
    }
  }
  addValues();

  // for (i=1; i < rowNum+1; i++) {
  //   let total = ($('#(h-${i})').val()*3600) + ($('#(m-${i})').val()*60) + ($('#(s-${i}')).val();
  //   console.log(total);
  // }
  // let total = ($('#h-1').val()*3600) + ($('#m-1').val()*60) + $('#s-1)').val();
  // console.log(total);
});
