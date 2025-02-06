/* eslint-env jest */
/* eslint-disable max-len */

// Tests timeMath.js module only

// Terminal in root dir: npm test
// or npm test src/timeMath.test.js

import {default as timeMath} from './timeMath.js';

test('if hours is positive', () => {
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

describe('Ensuring no negative 0s', () => {
  test('Negative Zero: if total is negative, the 0s should not be -0. min & sec test', () => {
    const input = [
      ['Title', 'Hours', 'Minutes', 'Seconds'],
      ['bob', '-7', 0, 0],
    ];
    const output = {
      'roundHours': -7,
      'roundMin': 0,
      'leftoverSec': 0,
    };
  
    expect(timeMath(input)).toStrictEqual(output);
  });
  test('Negative Zero: if total is negative, the 0s should not be -0. hrs & sec test', () => {
    const input = [
      ['Title', 'Hours', 'Minutes', 'Seconds'],
      ['bob', '0', -7, 0],
    ];
    const output = {
      'roundHours': 0,
      'roundMin': -7,
      'leftoverSec': 0,
    };
  
    expect(timeMath(input)).toStrictEqual(output);
  });
});

describe('Large enough positive values with smaller negative values should be positive', () => {
  test('Large enough positive value in min with negative hours should be positive end result', () => {
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

});

// ------------------------------------//
// Let test driven development BEGIN!
// ------------------------------------//

describe('Allow certain characters to be interpreted as 0', () => {
  // Space test only fails on the seconds
  // Probably because the seconds don't get multiplied by anything
  // Should code all 3 to be safe

  describe('Change spaces to 0', () => {
    test('Allow one space in hours', () => {
      const input = [
        ['Title', 'Hours', 'Minutes', 'Seconds'],
        ['bob', ' ', 2, 8],
      ];
      const output = {
        'roundHours': 0,
        'roundMin': 2,
        'leftoverSec': 8,
      };

      expect(timeMath(input)).toStrictEqual(output);
    });
    test('Allow one space in minutes', () => {
      const input = [
        ['Title', 'Hours', 'Minutes', 'Seconds'],
        ['bob', 2, ' ', 8],
      ];
      const output = {
        'roundHours': 2,
        'roundMin': 0,
        'leftoverSec': 8,
      };

      expect(timeMath(input)).toStrictEqual(output);
    });

    test('Allow one space in seconds', () => {
      const input = [
        ['Title', 'Hours', 'Minutes', 'Seconds'],
        ['bob', 2, 8, ' '],
      ];
      const output = {
        'roundHours': 2,
        'roundMin': 8,
        'leftoverSec': 0,
      };

      expect(timeMath(input)).toStrictEqual(output);
    });

    test('Allow multiple spaces', () => {
      const input = [
        ['Title', 'Hours', 'Minutes', 'Seconds'],
        ['bob', 2, 8, '  '],
      ];
      const output = {
        'roundHours': 2,
        'roundMin': 8,
        'leftoverSec': 0,
      };

      expect(timeMath(input)).toStrictEqual(output);
    });
  });
  describe('Change minus to 0', () => {
    test('Allow one minus symbol in hours', () => {
      const input = [
        ['Title', 'Hours', 'Minutes', 'Seconds'],
        ['bob', '-', 0, 0],
      ];
      const output = {
        'roundHours': 0,
        'roundMin': 0,
        'leftoverSec': 0,
      };

      expect(timeMath(input)).toStrictEqual(output);
    });

    test('Allow one minus symbol in min', () => {
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

    test('Allow one minus symbol in sec', () => {
      const input = [
        ['Title', 'Hours', 'Minutes', 'Seconds'],
        ['bob', 0, 0, '-'],
      ];
      const output = {
        'roundHours': 0,
        'roundMin': 0,
        'leftoverSec': 0,
      };

      expect(timeMath(input)).toStrictEqual(output);
    });

    test('Allow one minus symbol in hours with 2 rows, the second has a real value', () => {
      const input = [
        ['Title', 'Hours', 'Minutes', 'Seconds'],
        ['bob', '7', 0, 0],
        ['helma', '-', 0, 0],
      ];
      const output = {
        'roundHours': 7,
        'roundMin': 0,
        'leftoverSec': 0,
      };

      expect(timeMath(input)).toStrictEqual(output);
    });
  });

  test('Allow one dot symbol in h', () => {
    const input = [
      ['Title', 'Hours', 'Minutes', 'Seconds'],
      ['bob', '.', 0, 0],
    ];
    const output = {
      'roundHours': 0,
      'roundMin': 0,
      'leftoverSec': 0,
    };

    expect(timeMath(input)).toStrictEqual(output);
  });
  test('Allow one dot symbol in m', () => {
    const input = [
      ['Title', 'Hours', 'Minutes', 'Seconds'],
      ['bob', 0, '.', 0],
    ];
    const output = {
      'roundHours': 0,
      'roundMin': 0,
      'leftoverSec': 0,
    };

    expect(timeMath(input)).toStrictEqual(output);
  });
  test('Allow one dot symbol in s', () => {
    const input = [
      ['Title', 'Hours', 'Minutes', 'Seconds'],
      ['bob', 0, 0, '.'],
    ];
    const output = {
      'roundHours': 0,
      'roundMin': 0,
      'leftoverSec': 0,
    };

    expect(timeMath(input)).toStrictEqual(output);
  });
}); // end describe


describe('Multiple dot symbols', () => {
  // This test requires no coding because it automatically failed
  test('Multiple dots in hours', () => {
    const input = [
      ['Title', 'Hours', 'Minutes', 'Seconds'],
      ['bob', '3.4.5', 0, 0],
    ];
    const output = {
      'roundHours': NaN,
      'roundMin': NaN,
      'leftoverSec': NaN,
    };

    expect(timeMath(input)).toStrictEqual(output);
  });

  test('Multiple dots in min', () => {
    const input = [
      ['Title', 'Hours', 'Minutes', 'Seconds'],
      ['bob', 0, '3.4.5', 0],
    ];
    const output = {
      'roundHours': NaN,
      'roundMin': NaN,
      'leftoverSec': NaN,
    };

    expect(timeMath(input)).toStrictEqual(output);
  });


  test('Multiple dots in sec', () => {
    const input = [
      ['Title', 'Hours', 'Minutes', 'Seconds'],
      ['bob', 0, 0, '3.4.5'],
    ];
    const output = {
      'roundHours': NaN,
      'roundMin': NaN,
      'leftoverSec': NaN,
    };

    expect(timeMath(input)).toStrictEqual(output);
  });
});

describe('Generalized test with dot minus and spaces', () =>{
  test('Allow one dot minus and spaces in h m s', () => {
    const input = [
      ['Title', 'Hours', 'Minutes', 'Seconds'],
      ['bob', '-', '     ', '.'],
      ['helma', 7, 3, 5]
    ];
    const output = {
      'roundHours': 7,
      'roundMin': 3,
      'leftoverSec': 5,
    };

    expect(timeMath(input)).toStrictEqual(output);
  });
});
