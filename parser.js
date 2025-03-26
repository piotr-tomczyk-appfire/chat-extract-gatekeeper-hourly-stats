const fs = require('fs');
const path = require('path');

// Path to the JSON file
const filePath = path.join(__dirname, 'result.json');

// Function to list all nested keys
function listNestedKeys(obj) {
  let keys = new Set();
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.keys(obj[key]).forEach(k => keys.add(k));
    }
  }
  return Array.from(keys);
}

// Read and process the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  const jsonData = JSON.parse(data);
  const allKeys = listNestedKeys(jsonData);
  console.log(allKeys);
});