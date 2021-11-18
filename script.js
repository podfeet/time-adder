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
    // add click functions to 3 and up + buttons
    for (let j = 1; j < (timeInputArray.ids.length + 1); j += 1) {
      // BUG: when adding another row, outline/solid changes back to defaults. This means the whole row is getting re-rendered, so what people have typed in will disappear too. Need to figure out how to not change existing rows when addRow() is run. Maybe this is why I need a Class?
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
  renderRow();

  //  add event listeners to the buttons
  function addRow() {
    i += 1;
    console.log(`DEBUG: i is ${i}`)
    timeInputArray.ids.push({
      hoursID: `hours-${i}`,
      minID: `min-${i}`,
      secID: `sec-${i}`,
      addBtnID: `add-${i}`,
      subBtnID: `sub-${i}`,
    });
     renderRow();
  }

  //  add click handler to the AddAnotherRow button
  $('#moreTimes').click(function() {
    addRow();
  })

});
