const fs = require('fs');
const path = require('path');

const componentsPath = path.join(__dirname, '../src/components');
module.exports = fs.readdirSync(componentsPath).reduce((aliases, name) => {
  const uppercaseName = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  const dir = `${componentsPath}/${name}`;
  const alias = `components/${uppercaseName}`;
  if (fs.statSync(dir).isDirectory()) {
    return Object.assign({ ...aliases }, { [alias]: `${dir}/${name}.js` });
  }
  return aliases;
}, {});
