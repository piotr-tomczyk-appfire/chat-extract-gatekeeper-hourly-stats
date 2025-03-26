const fs = require('fs');
const path = require('path');

// Path to the JSON file
const filePath = path.join(__dirname, 'reorganized_data.json');

// Function to transform and sort the nested objects
function transformAndSort(jsonData) {
  const result = {};

  for (const endpoint in jsonData) {
    const clients = Object.entries(jsonData[endpoint])
      .map(([clientId, usage]) => ({ clientId, usage }))
      .sort((a, b) => b.usage - a.usage);

    result[endpoint] = clients;
  }

  return result;
}

// Read and process the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  const jsonData = JSON.parse(data);
  const transformedData = transformAndSort(jsonData);

  // Path to the output JSON file
  const outputFilePath = path.join(__dirname, 'sorted_data.json');

  // Write the transformed and sorted data to a file
  fs.writeFile(outputFilePath, JSON.stringify(transformedData, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Transformed and sorted data has been saved to', outputFilePath);
  });
});