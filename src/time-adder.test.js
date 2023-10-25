// This test file doesn't work because jest does not recognize $
// jQuery isn't loaded because this file looks just at the script.js file
// and jQuery is called by the html file


import {default as timeMath} from './timeMath.js';

test ('roundHours if totSec is positive', () => {
  // const totSec = 26760;
  const input = [
    ["Title", "Hours", "Minutes", "Seconds"],
    ['bob', '7', 0, 1],
    // ['', 0, 0, 0]
  ];
  const output = {
    'leftoverSec': 1,
    'roundHours': 7,
    'roundMin': 0,
  };

  expect(timeMath(input)).toStrictEqual(output);
});

test ('roundHours if totSec is negative', () => {
  const totSec = -26760;
  expect(Math.floor(totSec / 3600)).toBe(-8);
});
