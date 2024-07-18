const { createClient } = require('redis');

(async() => {
    const client = await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

    
    await client.set('name', 'bob');
    console.log(await client.get('name'));

    const suits = ['spade', 'club', 'diamond', 'heart'];
    if(!await client.exists('suits')){
        await client.rPush('suits', suits);
    }
    console.log(await client.lRange('suits', 0, -1));

    await client.hSet('user', {
        username: 'bob',
        email: 'bob@gmail.com',
    });
    console.log(await client.hGetAll('user'));

    if(!await client.exists('set')){
        await client.sAdd('set', 'value1');
        await client.sAdd('set', 'value2');
        await client.sAdd('set', 'value2');
    }
    console.log(await client.sMembers('set'));


    const loggedUsers = [
        {  
            id: 1,
            username: 'john',
        },
        {
            id: 2,
            username: 'paul',
        }
    ];
    const sessionTTL = 7;

    for(const user of loggedUsers){
        const sessionKey = 'session:' + user.id;
        const sessionData = JSON.stringify({ username: user.username });

        await client.setEx(sessionKey, sessionTTL, sessionData);
    }

    for(let key of await client.keys('session:*')){
        console.log(key + ': ', JSON.parse(await client.get(key)));
    }

    await client.del('session:1');
    await client.hDel('user', 'username');
    await client.sRem('set', 'value1');

    await client.disconnect();
})();
