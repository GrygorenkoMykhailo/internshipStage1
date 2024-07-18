const mysql = require('mysql');

const dboptions = {
    host: 'localhost',
    user: 'root',
    password: 'Root123',
    database: 'mydatabase'
}

const connection = mysql.createConnection(dboptions);

connection.connect();

connection.query('SELECT COUNT(*) AS result FROM Users', (err, results, fields) => {
    if (err) throw err;

    console.log('Amount of records:', results[0].result);

    if (+results[0].result < 1000000) { 
        const data = [];

        for(let i = 0; i < 1000000; i++){
            data.push(['Bob', `bob${i}@gmail.com`]);
        }   

        connection.query('INSERT INTO Users (Username, Email) VALUES ?', [data], (err, results, fields) => {
            if (err) throw err;
            connection.end();
        });
    } else {
        //without unique index = 614ms;
        //with unique index = 8.14ms;
        console.time('query_exec_time');
        connection.query('SELECT * FROM Users WHERE Email = ?', ['bob512256@gmail.com'], (err, results, fields) => {
            if (err) throw err;
            console.log(results[0]);
            console.timeEnd('query_exec_time');
        });
        connection.end();
    }
});

