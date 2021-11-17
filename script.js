/* eslint-env jquery */
/* global Mustache */

const timeInputArray = {
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

let i = 2;
// Document Ready Handler
$(() => {
  function renderRow(){
    //  get the template string from the script tag
    const tplString = $('#tpl_string').html();
    //  render the template string with the data
    const tplOutput = Mustache.render(tplString, timeInputArray);
    //  put the rendered template string into the placeholder div
    $('#timeRowPlaceholder').html(tplOutput);
  }
  renderRow();

  //  add event listeners to the buttons
  function addRow() {
    i += 1;
    timeInputArray.ids.push({
      hoursID: `hours-${i}`,
      minID: `min-${i}`,
      secID: `sec-${i}`,
      addBtnID: `add-${i}`,
      subBtnID: `sub-${i}`,
    });
     renderRow();
  }

  //  add event listeners to the buttons
  $('#moreTimes').click(function() {
    addRow();
  })
  
  // Let's take a crack at doing something when +/- buttons are clicked
  //  add event listeners to the buttons
  // BUG: error on the ID of the button, worked generically as #add-1
  for (i = 0; i < timeInputArray.ids.length; i += 1) {
    $('#add-${i}').click(function() {
      console.log('add button clicked');
    });
  };



});
