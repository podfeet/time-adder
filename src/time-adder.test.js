// This test file doesn't work because jest does not recognize $
// jQuery isn't loaded because this file looks just at the script.js file
// and jQuery is called by the html file


import {default as timeMath} from './timeMath.js';

test ('if hours is positive', () => {
  const input = [
    ['Title', 'Hours', 'Minutes', 'Seconds'],
    ['bob', '7', 0, 1],
  ];
  const output = {
    'roundHours': 7,
    'roundMin': 0,
    'leftoverSec': 1,
  };

  expect(timeMath(input)).toStrictEqual(output);
});

test ('if hours is negative', () => {
  const input = [
    ['Title', 'Hours', 'Minutes', 'Seconds'],
    ['bob', '-7', 0, 0],
  ];
  // If the final answer is negative, the 0s must be negative
  const output = {
    'roundHours': -7,
    'roundMin': 0,
    'leftoverSec': 0,
  };

  expect(timeMath(input)).toStrictEqual(output);
});

test ('hours is negative but min is bigger positive', () => {
  const input = [
    ['Title', 'Hours', 'Minutes', 'Seconds'],
    ['bob', '-1', 61, 0],
  ];
  const output = {
    'roundHours': 0,
    'roundMin': 1,
    'leftoverSec': 0,
  };

  expect(timeMath(input)).toStrictEqual(output);
});

test ('hours & sec returned calculates -0 should change to 0', () => {
  const input = [
    ['Title', 'Hours', 'Minutes', 'Seconds'],
    ['bob', 0, -1, 0],
  ];
  const output = {
    'roundHours': 0,
    'roundMin': -1,
    'leftoverSec': 0,
  };

  expect(timeMath(input)).toStrictEqual(output);
});

// Let test driven development BEGIN!

test ('minus should be interpreted as 0', () => {
  const input = [
    ['Title', 'Hours', 'Minutes', 'Seconds'],
    ['bob', 0, '-', 0],
  ];
  const output = {
    'roundHours': 0,
    'roundMin': 0,
    'leftoverSec': 0,
  };

  expect(timeMath(input)).toStrictEqual(output);
});
