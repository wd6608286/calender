const fs = require('fs');
const path = require('path');

function copyFileSync(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠ Source not found: ${src}`);
    return false;
  }
  
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.copyFileSync(src, dest);
  console.log(`✓ Copied: ${path.basename(src)}`);
  return true;
}

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠ Source not found: ${src}`);
    return false;
  }
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  let count = 0;
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }
  
  console.log(`✓ Copied ${count} files from ${path.basename(src)}`);
  return true;
}

const baseDir = 'D:\\aiproject';
const sourceDir = path.join(baseDir, 'Calender');
const targetDir = path.join(baseDir, 'calender-vue');

console.log('====================================');
console.log('Copying assets to Vue project...');
console.log('====================================\n');

copyDirSync(
  path.join(sourceDir, 'images'),
  path.join(targetDir, 'public', 'images')
);

console.log('');

copyDirSync(
  path.join(sourceDir, 'media'),
  path.join(targetDir, 'public', 'media')
);

console.log('');

const assetsDir = path.join(targetDir, 'src', 'assets');
const cssFiles = ['style.css', 'clndr.css', 'audio.css', 'easy-responsive-tabs.css'];

cssFiles.forEach(file => {
  copyFileSync(
    path.join(sourceDir, 'css', file),
    path.join(assetsDir, file)
  );
});

console.log('\n====================================');
console.log('✓ All assets copied successfully!');
console.log('====================================');