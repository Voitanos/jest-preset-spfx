import * as fs from "fs";
import * as path from "path";

// load package.json file
const packageJson = require('../package.json');

// get arguments for the tag (1.3.0) & release name (1.3.0-beta.1)
const release_tag = `${process.argv[process.argv.length-2]}`;
const release_name = `${process.argv[process.argv.length-1]}`;

// update the version of the package.json file (before publishing)
packageJson.version += `-${release_name.replace(release_tag + '-', '')}`;
console.log('publish version:', packageJson.version);

// save the package.json file (before publishing)
fs.writeFileSync(path.join(path.resolve('.'), 'package.json'), JSON.stringify(packageJson, null, 2));