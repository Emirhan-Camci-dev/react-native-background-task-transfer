const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const HEADER = "// Copyright (c) 2026 Emirhan CAMCI. All rights reserved.\n";

function findFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('build') && !file.includes('.git')) {
        results = results.concat(findFiles(file));
      }
    } else {
      if (file.match(/\.(js|jsx|ts|tsx|cpp|m|mm|swift|java)$/)) {
        results.push(file);
      }
    }
  });
  return results;
}

const targetDirs = [
  'react-native-background-file-transfer/packages/core/src',
  'react-native-background-file-transfer/packages/core/android/src',
  'react-native-background-file-transfer/packages/core/ios',
  'react-native-background-file-transfer/packages/core/cpp',
  'react-native-background-file-transfer/packages/pro/core/src',
  'react-native-background-file-transfer/packages/pro/core/android/src',
  'react-native-background-file-transfer/packages/pro/core/ios',
  'react-native-background-file-transfer/packages/pro/core/cpp',
];

targetDirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    const files = findFiles(fullPath);
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      if (!content.startsWith(HEADER)) {
        fs.writeFileSync(file, HEADER + '\n' + content);
        console.log('Added header to ' + file);
      }
    });
  }
});
