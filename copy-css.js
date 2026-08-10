const fs = require('fs');
const path = require('path');

const source = 'D:\\aiproject\\Calender\\css';
const dest = 'D:\\aiproject\\calender-vue\\src\\assets';

const files = ['style.css', 'clndr.css', 'audio.css', 'easy-responsive-tabs.css'];

files.forEach(file => {
  const src = path.join(source, file);
  const dst = path.join(dest, file);
  
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log('Copied:', file);
  } else {
    console.log('Not found:', src);
  }
});

console.log('Done');