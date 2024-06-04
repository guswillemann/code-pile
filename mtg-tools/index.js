const fs = require('node:fs');
const path = require('node:path');
const { finished, Readable } = require('node:stream');

const fileList = require('./file-list.json');

fileList.forEach(({ src, name }) => {
  const fileName = name
    .split('\/\/')[0]
    .trim()
    .toLowerCase()
    .replace(/"/g, '')
    .replace(/:? /g, '-') + '.jpg';

  downloadFile(src, fileName);
});

async function downloadFile(url, fileName) {
  const res = await fetch(url);
  const destination = path.resolve('./src/assets/img/bounty', fileName);
  const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
  await finished(Readable.fromWeb(res.body).pipe(fileStream), (err) => console.log(err));
}