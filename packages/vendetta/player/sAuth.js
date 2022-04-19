const DB = require ('../core/sMysql').DB;
const bcrypt = require('bcrypt');
const money = require ('../core/moneySystem/sMoneySystem');

mp.events.add('playerReady', player => {
    player.call('auth:showAuthDialog');
    player.setVariable('REMOTE_ID', player.id);
    player.setVariable('REMOTE_ADM', player.admin);
    //console.log()
});


mp.events.add("auth:accountAuth", (player, data) => {
    data = JSON.parse(data);
    DB.query('SELECT * FROM accounts WHERE login = ? LIMIT 1', [data.login], function (err, results){
        if(results.length == 0) return player.call('notify:pushNotify', [1, 1, 'Неверный Логин или Пароль', 3000]);
        if(results[0].socialclub != player.socialClub) return player.call('notify:pushNotify', [1, 1, 'Этот аккаунт привязан к другому SocialClub', 3000]);

        const dbPassword = results[0].password;
        bcrypt.compare(data.password, dbPassword).then(async function(isMatched) {
            if(!isMatched) return player.call('notify:pushNotify', [1, 1, 'Неверный Логин или Пароль', 3000]);
            player.name = data.login;
            player.admin = results[0].admin;
            money.sendMoneyToClient(player);
            money.sendBankToClient(player);
            player.call("auth:hideAuthDialog");
            player.loadCharacter();
            setTimeout(() => {
                if(player.needUpdateCharacter) {
                    player.sendToCreator()
                    player.needUpdateCharacter = undefined
                }
            }, 100);
        });
    });
});

mp.events.add("auth:accountRegistration", (player, data) => {
    data = JSON.parse(data);
    DB.query('SELECT * FROM accounts WHERE login = ?', [data.login], function (err, results){
        console.log(results)
        if(results.length > 0) return player.call('notify:pushNotify', [1, 1, 'Аккаунт с таким Логином уже существует', 3000]);
        DB.query('SELECT id FROM accounts WHERE email = ?', [data.email], function (err, results){
            if(results.length > 0) return player.call('notify:pushNotify', [1, 1, 'Аккаунт с такой Почтой уже существует', 3000]);
            DB.query('SELECT id FROM accounts WHERE socialclub = ?', [player.socialClub], function (err, results){
                if(results.length > 0) return player.call('notify:pushNotify', [1, 1, 'Аккаунт с таким SocialClub уже существует', 3000]);
                bcrypt.hash(data.password, 10, function(err, passwordHash) {
                    DB.query('INSERT INTO accounts SET login = ?, password = ?, email = ?, socialclub = ?', [data.login, passwordHash, data.email, player.socialClub], function(err, results) {
                        player.name = data.login;
                        player.admin = 0;
                        money.sendMoneyToClient(player);
                        money.sendBankToClient(player);
                        player.call("auth:hideAuthDialog");
                        player.sendToCreator()
                    });
                });
            })
        });
    });
});