const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Paths to the CSV files
const filePaths = [
    path.join(__dirname, 'data1.csv'),
    path.join(__dirname, 'data2.csv'),
    path.join(__dirname, 'data3.csv'),
    path.join(__dirname, 'data4.csv')
];

const average = false;
const max = true;

// Function to read and process a single CSV file
function processCsvFile(filePath) {
    return new Promise((resolve, reject) => {
        const result = {};

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const clientKey = row['Item/clientKey/S'];
                const apiKey = row['Item/apiKey/S'];
                const statCount = parseInt(row['Item/statCount/N'], 10);

                if (!result[clientKey]) {
                    result[clientKey] = {};
                }

                if (!result[clientKey][apiKey]) {
                    result[clientKey][apiKey] = 0;
                }

                if (average) {
                    if (result[clientKey][apiKey] === 0) {
                        result[clientKey][apiKey] += statCount;
                    } else {
                        result[clientKey][apiKey] += statCount;
                        result[clientKey][apiKey] /= 2;
                    }
                } else if (max) {
                    if (statCount > result[clientKey][apiKey]) {
                        result[clientKey][apiKey] = statCount;
                    }
                } else {
                    result[clientKey][apiKey] += statCount;
                }

            })
            .on('end', () => resolve(result))
            .on('error', (err) => reject(err));
    });
}

// Function to merge results from multiple files
function mergeResults(resultsArray) {
    const finalResult = {};

    resultsArray.forEach(result => {
        for (const clientKey in result) {
            if (!finalResult[clientKey]) {
                finalResult[clientKey] = {};
            }

            for (const apiKey in result[clientKey]) {
                if (!finalResult[clientKey][apiKey]) {
                    finalResult[clientKey][apiKey] = 0;
                }

                if (average) {
                    if (finalResult[clientKey][apiKey] === 0) {
                        finalResult[clientKey][apiKey] += result[clientKey][apiKey];
                    } else {
                        finalResult[clientKey][apiKey] += result[clientKey][apiKey];
                        finalResult[clientKey][apiKey] /= 2;
                    }
                } else if (max) {
                    if (result[clientKey][apiKey] > finalResult[clientKey][apiKey]) {
                        finalResult[clientKey][apiKey] = result[clientKey][apiKey];
                    }
                } else {
                    finalResult[clientKey][apiKey] += result[clientKey][apiKey];
                }
            }
        }
    });

    return finalResult;
}

// Function to process all files and save the result as a JSON file
async function processAllFiles(filePaths) {
    try {
        const resultsArray = await Promise.all(filePaths.map(processCsvFile));
        const finalResult = mergeResults(resultsArray);

        // Save the final result as a JSON file
        const outputFilePath = path.join(__dirname, 'result.json');
        fs.writeFile(outputFilePath, JSON.stringify(finalResult, null, 2), (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
            } else {
                console.log('JSON file has been saved.');
            }
        });
    } catch (err) {
        console.error('Error processing files:', err);
    }
}

// Call the function to process all files
processAllFiles(filePaths);