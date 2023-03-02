// This test file doesn't work because jest does not recognize $
// jQuery isn't loaded because this file looks just at the script.js file
// and jQuery is called by the html file

// BUG: what do I want to import 
import from "./index-body.js"
// import joiner from "./joiner.mjs";

const totSect = require('./script');

test ('roundHours if totSec is positive', () => {
  const totSec = 26760;
  expect(Math.floor(totSec / 2600).toBe(7));
});

test ('roundHours if totSec is negative', () => {
  const totSec = -26760;
  expect(Math.floor(totSec / 2600).toBe(7));
});
