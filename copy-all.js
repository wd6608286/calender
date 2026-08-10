const fs = require('fs');
const path = require('path');

const srcDir = 'D:\\aiproject\\Calender\\css';
const destDir = 'D:\\aiproject\\calender-vue\\src\\assets';

// Copy bootstrap.css
const bootstrapSrc = path.join(srcDir, 'bootstrap.css');
const bootstrapDest = path.join(destDir, 'bootstrap.css');
if (fs.existsSync(bootstrapSrc)) {
  fs.copyFileSync(bootstrapSrc, bootstrapDest);
  console.log('Copied bootstrap.css');
}

// Copy jquery-ui.css
const jquerySrc = path.join(srcDir, 'jquery-ui.css');
const jqueryDest = path.join(destDir, 'jquery-ui.css');
if (fs.existsSync(jquerySrc)) {
  fs.copyFileSync(jquerySrc, jqueryDest);
  console.log('Copied jquery-ui.css');
}

// Copy images
const imgSrc = 'D:\\aiproject\\Calender\\images';
const imgDest = 'D:\\aiproject\\calender-vue\\public\\images';
if (fs.existsSync(imgSrc)) {
  if (!fs.existsSync(imgDest)) {
    fs.mkdirSync(imgDest, { recursive: true });
  }
  
  function copyDir(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  copyDir(imgSrc, imgDest);
  console.log('Copied images');
}

console.log('All files copied successfully!');