const fs = require('fs');
const path = require('path');

// Path to the JSON file
const filePath = path.join(__dirname, 'result.json');

// List of properties to sort by
const properties = [
  'Chat#POST#webhook',
  'Chat#GET#init-chat',
  'Chat#POST#listen',
  'Chat#GET#chat',
  'Chat#GET#sd-portal-chat',
  'Chat#GET#online',
  'Chat#GET#fieldsForInitForm',
  'Chat#GET#attachments',
  'Chat#POST#identity',
  'Chat#GET#agent-dashboard',
  'Chat#DELETE#identity',
  'Chat#GET#nps',
  'Chat#GET#dashboard',
  'Chat#GET#project',
  'Chat#POST#chat-file',
  'Chat#POST#chat',
  'Chat#PUT#dashboard',
  'Chat#GET#cr',
  'Chat#POST#online',
  'Chat#PUT#project',
  'Chat#DELETE#online',
  'Chat#GET#sd-portal-chat-dialog',
  'Chat#GET#kb',
  'Chat#POST#config',
  'Chat#GET#project-config',
  'Chat#GET#config',
  'Chat#POST#user-deleted',
  'Chat#GET#post-install',
  'Chat#GET#app-page',
  'Chat#GET#whatsapp',
  'Chat#GET#issue-glance',
  'Chat#GET#translation-page',
  'Chat#GET#push-notifications',
  'Chat#GET#i18n',
  'Chat#GET#config-page',
  'Chat#POST#whatsapp',
  'Chat#POST#installed',
  'Chat#GET#widget-preview-page',
  'Chat#HEAD#init-chat',
  'Chat#POST#dashboard',
  'Chat#GET#identity',
  'Chat#POST#enabled',
  'Chat#POST#uninstalled',
  'Chat#PUT#widget-initialized',
  'Chat#GET#enabled',
  'Chat#POST#translation-page',
  'Chat#POST#sd-portal-chat-dialog',
  'Chat#POST#agent-dashboard',
  'Chat#GET#user-deleted',
  'Chat#POST#config-page',
  'Chat#POST#widget-preview-page',
  'Chat#POST#sd-portal-chat',
  'Chat#GET#admin-page',
  'Chat#POST#project-config',
  'Chat#POST#issue-glance',
  'Chat#POST#app-page',
  'Chat#POST#admin-page',
  'Chat#POST#migration'
];

// Read and process the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  const jsonData = JSON.parse(data);
  const sortedJson = {};

  properties.forEach(property => {
    for (const key in jsonData) {
      if (jsonData[key][property] !== undefined) {
        if (!sortedJson[property]) {
          sortedJson[property] = {};
        }
        sortedJson[property][key] = jsonData[key][property];
      }
    }
  });

  // Path to the output JSON file
  const outputFilePath = path.join(__dirname, 'reorganized_data.json');

  // Write the sorted JSON to a file
  fs.writeFile(outputFilePath, JSON.stringify(sortedJson, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Reorganized JSON data has been saved to', outputFilePath);
  });
});