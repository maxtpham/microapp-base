const path = require('path');
const fs = require('fs');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DEV_ENV = process.env.DEV_ENV || 'local';
// Load the config.js file
const configSource = path.resolve(__dirname, `../../../config/${NODE_ENV}${DEV_ENV === 'local' ? '' : ('-' + DEV_ENV)}.js`);
require(configSource);
const packageJson = require(path.resolve(__dirname, '../../../package.json'));

// Build the config.js content
let configJs = `config=${JSON.stringify({...config, version: packageJson.version})}`;
// - Docker Dev will be replaced with arguments: BASE_URL, ARG1..9
if (NODE_ENV === 'development' && DEV_ENV === 'docker') {
    const replaceAll = function (input, search, replace) {
        while (input.indexOf(search) >= 0) input = input.replace(search, replace);
        return input;
    }
    configJs = replaceAll(configJs, '${BASE_URL}', process.env.BASE_URL);
    for (i = 1; i < 9; i++) configJs = replaceAll(configJs, '${ARG' + i + '}', process.env['ARG' + i]);
}

// Save config.js to build output
const configPath = path.resolve(__dirname, NODE_ENV === 'production' ? '../../../bin/prd/config.js' : '../../../bin/dev/config.js');
fs.writeFileSync(configPath, configJs);
console.log(`File saved to '${configPath}': ${configJs} (FROM: ${configSource})`);

// Save version to build output
const versionPath = path.resolve(__dirname, NODE_ENV === 'production' ? '../../../bin/prd/version' : '../../../bin/dev/version');
fs.writeFileSync(versionPath, packageJson.version);
console.log(`File saved to '${versionPath}': ${packageJson.version}`);

// Load index.html
const indexHtmlPath = path.resolve(__dirname, NODE_ENV === 'production' ? '../../../bin/prd/index.html' : '../../../bin/dev/index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, { encoding: 'utf8' });
fs.writeFileSync(indexHtmlPath, indexHtmlContent.replace(/\$\{IMAGE_VERSION\}/g, packageJson.version), { encoding: 'utf8' });
console.log(`File saved to '${indexHtmlPath}'`);