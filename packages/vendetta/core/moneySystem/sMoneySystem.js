const query = require ('../sMysql').query;

module.exports.getBalance = async (player, type) => {
    if(type === "money") {
        const rows = await query('SELECT `money` FROM `accounts` WHERE login = ?', [player.name]);
        return rows[0]['money'];
    } else if(type === "bank") {
        const rows = await query('SELECT `bank` FROM `accounts` WHERE login = ?', [player.name]);
        return rows[0]['bank'];
    }
}

module.exports.getBalanceSorting = async (player, type) => {
    if(type === "money") {
        const rows = await query('SELECT `money` FROM `accounts` WHERE login = ?', [player.name]);
        return rows[0]['money'].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    } else if(type === "bank") {
        const rows = await query('SELECT `bank` FROM `accounts` WHERE login = ?', [player.name]);
        return rows[0]['bank'].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
}

module.exports.setBalance = async (player, type, balance) => {
    if(type === "money") {
        await query('UPDATE `accounts` SET `money` = ? WHERE login = ?', [balance, player.name]);
        player.call('onBalanceChanged', [balance]);
        this.sendMoneyToClient(player);
    } else if(type === "bank") {
        await query('UPDATE `accounts` SET `bank` = ? WHERE login = ?', [balance, player.name]);
        player.call('onBalanceChanged', [balance]);
        this.sendBankToClient(player);
    }
}

module.exports.incrementBalance = async (player, type, sum) => {
    if(type === "money") {
        await query('UPDATE `accounts` SET `money` = `money` + ? WHERE login = ?', [sum, player.name]);
        this.sendMoneyToClient(player);
    } else if(type === "bank") {
        await query('UPDATE `accounts` SET `bank` = `bank` + ? WHERE login = ?', [sum, player.name]);
        this.sendBankToClient(player)
    }
}

module.exports.decrementBalance = async (player, type, sum) => {
    if(type === "money") {
        const balance = await this.getBalance(player);
        if(balance < sum) throw 'noMoney';
        await query('UPDATE `accounts` SET `money` = `money` - ? WHERE login = ? AND money >= ?', [sum, player.name, sum]);
        this.sendMoneyToClient(player);
    } else if(type === "bank") {
        const balance = await this.getBalance(player)
        if(balance < sum) throw 'noMoney';
        await query('UPDATE `accounts` SET `bank` = `bank` - ? WHERE login = ? AND bank >= ?', [sum, player.name, sum]);
        this.sendBankToClient(player);
    }
}

module.exports.sendMoneyToClient = async (player) => {
    player.call('hud:MoneyChangedHud', [await this.getBalanceSorting(player, "money")])
}

module.exports.sendBankToClient = async (player) => {
    player.call('hud:BankChangedHud', [await this.getBalanceSorting(player, "bank")])
}
