const fs = require('fs');

const AUTHOR = "Emirhan CAMCI - byemir@live.com";
const LICENSE = "Dual-License (AGPLv3 / Proprietary)";

const packageJsons = [
  'package.json',
  'react-native-background-file-transfer/package.json',
  'react-native-background-file-transfer/packages/core/package.json',
  'react-native-background-file-transfer/packages/pro/package.json',
  'react-native-background-file-transfer/example/package.json'
];

packageJsons.forEach(file => {
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    data.author = AUTHOR;
    data.license = LICENSE;
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
    console.log('Updated ' + file);
  }
});
