const fs = require('fs');
const path = require('path');
const readline = require('readline');

module.exports.saveToFile = (data, filename) => {
    fs.writeFileSync(path.join(__dirname, '..', 'data', filename), data, (err) => {
        if(err) console.error(err);
    });
};

module.exports.readFromFile = (filename) => {
    return fs.readFileSync(path.join(__dirname, '..', 'data', filename), 'utf-8');
}

module.exports.readNthCharacter = async (filename, position) => {
    const file = fs.openSync(path.join(__dirname, '..', 'data', filename), 'r');
    const b = Buffer.alloc(1);

    return new Promise((resolve, reject) => {
        fs.read(file, b, 0, 1, position, (err, bytesRead, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer.toString('utf-8'));
            }
        });
    });
};

module.exports.readFileByLines = async (filename) => {
    const fileStream = fs.createReadStream(path.join(__dirname, '..', 'data', filename));

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    const data = [];
    return new Promise((resolve, reject) => {
        try{
            rl.on('line' ,(line) => {
                data.push(line);
            })
    
            rl.on('close', () => {
                resolve(data);
            })
        }
        catch(error){
            reject(error);
        }
    })
}

module.exports.readDirectoryRecursive = (dirPath, maxDepth, currentDepth = 0) => {
    if (currentDepth > maxDepth) {
        return;
    }

    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const isDirectory = fs.statSync(fullPath).isDirectory();

        console.log(String.repeat(currentDepth * 2) + (isDirectory ? '📁' : '📄') + ' ' + item);

        if (isDirectory) {
            module.exports.readDirectoryRecursive(fullPath, maxDepth, currentDepth + 1);
        }
    });
}

module.exports.testMyFs = () => {
    module.exports.saveToFile(JSON.stringify({ username: "bob", email: "bob@gmail.com", age: 30  }), "data.json");
    console.log(module.exports.readFromFile("data.json"));

    (async() => {
        console.log(await module.exports.readNthCharacter("data.json", 2));
        console.log(await module.exports.readFileByLines("data.json"));
    })();
}