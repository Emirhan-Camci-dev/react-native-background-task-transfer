const fs = require('fs');

const file = 'rn-background-transfer-community/package.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
data.name = "rn-background-transfer";
data.license = "AGPL-3.0-only";
fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
console.log('Updated ' + file);
