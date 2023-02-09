const sass = require('sass');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

function compile(file, themeName) {
    console.log('Compiling: ' + file);
    if (!fs.existsSync(file)) {
        console.warn(file+' does not exists!');
        return;
    }

    const compressed = sass.compile(file, { style: 'compressed' });
   
    fs.writeFile('dist/'+themeName+'.css', compressed.css, {}, () => {
        console.log('Done writing: ' + 'dist/'+themeName+'.css');
    });
}

fs.readdir('src/themes', { withFileTypes: true }, (err, files) => {
    files.forEach(element => {
        if (element.isDirectory()) {
            const file = path.join('src', 'themes', element.name, 'main.scss');
            compile(file, element.name);
        }
    });
});