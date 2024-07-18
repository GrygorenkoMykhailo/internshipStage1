const myfs = require('./fs');
const https = require('https');
myfs.testMyFs();
myfs.readDirectoryRecursive("", Infinity);

https.get('https://www.google.com', (res) => {
    const data = [];
    res.on('data', (chunk) => {
        data.push(chunk);
    });

    res.on('end', () => {
        myfs.saveToFile(data.join(''), "response.txt");
    });
});

