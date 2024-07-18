const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Root123',
    database: 'mydatabase',
}

const knex = require('knex')({
    client: 'mysql',
    connection: dbOptions,
});

const recordsToUpdate = 100;

//with transaction: 100ms
//without transaction: 285ms
(async () => {
    console.time('updateWithoutTransaction');
    for (let i = 1; i <= recordsToUpdate; i++) {
        await knex('Users')
            .where('id', '=', i)
            .update({ username: 'bob' });
    }
    console.timeEnd('updateWithoutTransaction');

    console.time('updateWithTransaction');
    await knex.transaction(async trx => {
        const queries = [];
        for(let i = 1; i < recordsToUpdate; i++){
            queries.push(
                knex('Users')
                .where('id','=',i)
                .update({ username: 'bob', })
                .transacting(trx)
            );
        }
        await Promise.all(queries);
    });
    console.timeEnd('updateWithTransaction');

    await knex.destroy();
})();

