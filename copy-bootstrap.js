const fs = require('fs');
const path = require('path');

const sourceDir = 'D:\\aiproject\\Calender\\css';
const destDir = 'D:\\aiproject\\calender-vue\\src\\assets';

const filesToCopy = ['bootstrap.css', 'jquery-ui.css'];

filesToCopy.forEach(file => {
  const srcPath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);
  
  try {
    if (fs.existsSync(srcPath)) {
      const content = fs.readFileSync(srcPath);
      fs.writeFileSync(destPath, content);
      console.log('Copied:', file);
    } else {
      console.log('Not found:', srcPath);
    }
  } catch (err) {
    console.log('Error copying', file, ':', err.message);
  }
});

console.log('Done!');