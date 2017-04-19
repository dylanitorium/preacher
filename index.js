#!/usr/bin/env node

/**
 * Basic and shitty for now - creates a JS file that exports an array
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const convertFile = (p) => {

  if (!fs.lstatSync(p).isFile() || path.extname(p) != '.csv') {
    console.log('Skipping subdirectory');
    return;
  }

  // Read file
  const csv = fs.readFileSync(p, 'utf8');

  // Path of file to be written
  const newPath = p.replace(/\.[^/.]+$/, "") + '.js';

  // Parse rows
  let rows = csv.split(os.EOL);

  // Get header
  let header = rows.shift();

  // Get property names
  let properties = header.split(',').map(name => name.toLowerCase());

  // Generate output
  let output = 'export default [\n';
  rows.forEach((row) => {
    if (row) {
      output += '\ \ {\n';
      let values = row.split(/(,(?=\S)|:)/);
      let comma = values.indexOf(',');
      if (comma > -1) {
        values.splice(comma, 1);
      }
      values.forEach((value, index) => {
        if (value && properties[index]) {
          output += `\ \ \ \ ${properties[index]}:"${value}",\n`;
        }
      });
      output += '\ \ },\n';
    }
  })
  output += '];\n';

  // Write file
  fs.writeFileSync(newPath, output);

  // Notify client
  console.log('Wrote file ' + newPath);
}

// Path of file to be converted
const arg = process.argv[2];
if (fs.lstatSync(arg).isFile()) {
  convertFile(arg);
} else {
  const files = fs.readdirSync(arg);
  files.forEach(convertFile);
}
