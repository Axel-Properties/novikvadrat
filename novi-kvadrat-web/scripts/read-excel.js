const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const filePath = '/Users/abdullahkahvecioglu/DEV/novikvadrat/Data Entry.xlsx';
const workbook = xlsx.readFile(filePath);

// Get all sheet names
const sheetNames = workbook.SheetNames;
console.log('Sheet names:', sheetNames);
console.log('\n----------------------------\n');

// Process each sheet
sheetNames.forEach((sheetName, index) => {
  console.log(`Sheet ${index + 1}: ${sheetName}`);
  console.log('----------------------------');
  
  // Convert sheet to JSON
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);
  
  // Show first few rows
  console.log(`Total rows: ${jsonData.length}`);
  console.log('\nFirst 3 rows:');
  jsonData.slice(0, 3).forEach((row, i) => {
    console.log(`\nRow ${i + 1}:`, JSON.stringify(row, null, 2));
  });
  
  // Show column names
  if (jsonData.length > 0) {
    console.log('\nColumns:', Object.keys(jsonData[0]));
  }
  
  console.log('\n----------------------------\n');
  
  // Save to JSON file for easier processing
  const outputPath = path.join(__dirname, `../data/${sheetName.replace(/\s+/g, '_').toLowerCase()}.json`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
  console.log(`Data saved to: ${outputPath}`);
  console.log('\n===========================\n');
});