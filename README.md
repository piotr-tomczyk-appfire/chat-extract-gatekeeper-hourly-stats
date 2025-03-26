# chat-extract-gatekeeper-hourly-stats
How to work with this files:
- Get data from DynamoDb using export to S3 option.
- In S3 download the jsons (The program was created to handle 4 jsons but it can be easily expaned in app.js)
- Convert the jsons to csvs in https://www.convertcsv.com/json-to-csv.htm
- Name the csvs: data1.csv data2.csv data3.csv data4.csv
- In app.js you have 2 booleans: max and average. Only 1 boolean has to be set true at the time or both can be false.
- If max is set to true it will generate a document with maximum usage over hour for the endpoint for the user.
- If average is set to true it will generate a document with average usage over hour for the endpoint for the user.
- If both are set to fale it will generate a document with total usage over the hour for the endpoint for the user.

- The order to run the scripts is:
- app.js -> reorganizer.js -> sorter.js

- run them using node <filename>
