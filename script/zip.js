const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const outputPath = path.join(__dirname, '../target');
const outputFile = outputPath + '/snb-fe.zip';
const Dir = path.join(__dirname, '../');

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

console.log('Start zipping...');
// 创建输出
const output = fs.createWriteStream(outputFile);
const archive = archiver('zip', {
  zlib: { level: 9 },
});

output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log('Zipping complete');
});

output.on('end', () => {
  console.log('Data has been drained');
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
// 添加文件
archive.file((Dir + 'process.json'), { name: 'process.json' });
archive.file((Dir + 'app.js'), { name: 'app.js' });
archive.file((Dir + 'package.json'), { name: 'package.json' });
archive.directory(Dir + '/public', 'public');
archive.directory(Dir + '/src', 'src');
archive.directory(Dir + '/node_modules', 'node_modules');
archive.finalize();
