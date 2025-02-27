const fs = require('fs');

fs.copyFile('.env', './build/.env', (err) => {
  if (err) {
    throw err;
  }
});