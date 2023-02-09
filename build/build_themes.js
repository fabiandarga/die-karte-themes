const sass = require('sass');
const fs = require('fs');
const path = require('path');

function createFolderIfNotExists(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
        console.log('Created folder: ' + path);
    }
}

function compile(file, themeName) {
    console.log('Compiling: ' + file);
    if (!fs.existsSync(file)) {
        console.warn(file+' does not exists!');
        return;
    }

    const compressed = sass.compile(file, { style: 'compressed' });
   
    createFolderIfNotExists('dist/'+themeName);
    fs.writeFile('dist/'+themeName+'/main.css', compressed.css, {}, () => {
        console.log('Done writing: ' + 'dist/'+themeName+'/main.css');
    });
}

createFolderIfNotExists('dist');

fs.readdir('src/themes', { withFileTypes: true }, (err, files) => {
    files.forEach(element => {
        if (element.isDirectory()) {
            const file = path.join('src', 'themes', element.name, 'main.scss');
            compile(file, element.name);
        }
    });
});