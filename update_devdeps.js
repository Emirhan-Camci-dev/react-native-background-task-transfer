const fs = require('fs');

const proPkg = JSON.parse(fs.readFileSync('rn-background-transfer-pro/package.json', 'utf8'));
const devDeps = proPkg.devDependencies;

const commPkgPath = 'rn-background-transfer-community/package.json';
const commPkg = JSON.parse(fs.readFileSync(commPkgPath, 'utf8'));
commPkg.devDependencies = devDeps;

fs.writeFileSync(commPkgPath, JSON.stringify(commPkg, null, 2));
