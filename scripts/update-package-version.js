const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');
const release_tag = `${process.argv[process.argv.length-2]}`;
const release_name = `${process.argv[process.argv.length-1]}`;
packageJson.version += `-${release_name.replace(release_tag + '-', '')}`;
console.log('publish version:', packageJson.version);
// fs.writeFileSync(path.join(path.resolve('.'), 'package.json'), JSON.stringify(packageJson, null, 2));