const sass = require('sass');
// const fs = require('fs');
const fs = require('fs-extra')
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
   
    createFolderIfNotExists('dist/themes/'+themeName);
    fs.writeFile('dist/themes/'+themeName+'/main.css', compressed.css, {}, (err) => {
        if (err) {
            console.log('Error writing: ' + 'dist/themes/'+themeName+'/main.css');
        } else {
            console.log('Done writing: ' + 'dist/themes/'+themeName+'/main.css');
        }
    });
}

function copyAssets(themeName, folderName) {
    const origin = path.join('src', 'themes', themeName, folderName);
    if (!fs.existsSync(origin)) {
        console.info('Asset folder does not exist ', origin);
        return;
    }
    const dest = path.join('dist', 'themes', themeName, folderName)
    fs.copy(origin, dest, (err) => {
        if (err) {
            console.warn('Could not copy images', err);
        }
        console.log('copied all images to '+ origin);
    });
}

function copyImages(themeName) {
    copyAssets(themeName, 'images');
}

function copyFonts(themeName) {
    copyAssets(themeName, 'fonts');
}

createFolderIfNotExists('dist');
createFolderIfNotExists('dist/themes');

fs.readdir('src/themes', { withFileTypes: true }, (err, files) => {
    files.forEach(element => {
        if (element.isDirectory()) {
            const file = path.join('src', 'themes', element.name, 'main.scss');
            compile(file, element.name);
            copyImages(element.name);
            copyFonts(element.name);
        }
    });
});