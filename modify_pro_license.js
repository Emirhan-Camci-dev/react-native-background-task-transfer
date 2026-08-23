const fs = require('fs');

const file = 'react-native-background-file-transfer/packages/pro/package.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
data.license = "LicenseRef-Proprietary";
fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
console.log('Updated ' + file);
