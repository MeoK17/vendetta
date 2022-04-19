const money = require ('./sMoneySystem');

let banks = [
    {x: -350.94003, y: -49.52939, z: 48.089},
    {x: -2963.02636, y: 482.79370, z: 14.75309},
    {x: 314.29730, y: -278.69763, z: 53.22078},
    {x: 248.22589, y: 222.52969, z: 105.33676},
];

let colshapes = [];

for(let i of banks) {
    colshapes.push(mp.colshapes.newRectangle(i.x, i.y, 1.2, 1.2));
    mp.markers.new(27, new mp.Vector3(i.x, i.y, i.z),1.2,{
        "color": [255, 255, 255, 150],
        "direction": 0,
        "dimension": 0,
        "visible": true
    });
    mp.blips.new(207, new mp.Vector3(i.x, i.y, i.z),{
        name: 'Банк',
        scale: 1,
        color: 5,
        alpha: 255,
        drawDistance: 100,
        shortRange: true,
        rotation: 0,
        dimension: 0
    });
}

mp.events.add({
    "playerEnterColshape": (player, shape) => {
        for(let i of colshapes) {
            if(shape == i) {
                player.setVariable('INTERACTIONCHECK', 1);
                break;
            }
        }
    },
    "playerExitColshape": (player, shape) => {
        for(let i of colshapes) {
            if(shape == i) {
                player.setVariable('INTERACTIONCHECK', 0);
                player.call("moneySystem:HideBankDialog");
                break;
            }
        }
    },
    "moneySystem:Transition": async (player, json) => {
        json = JSON.parse(json);
        let sum = json.money;
        let type = json.type;
        switch (type) {
            case "money": {
                if(await money.getBalance(player, "bank") < sum) {
                    return player.call('notify:pushNotify', [1, 8, 'На банковском счету недостаточно средств', 3000]);
                }
                await money.decrementBalance(player, "bank", sum);
                await money.incrementBalance(player, "money", Math.round(sum-sum/100*3));
                player.call('notify:pushNotify', [2, 8, `С банковского счета снято ${Math.round(sum-sum/100*3)}$`, 3000]);
                break;
            }
            case "bank": {
                if(await money.getBalance(player, "money") < sum) {
                    return player.call('notify:pushNotify', [1, 8, 'Недостаточно средств', 3000]);
                }
                await money.decrementBalance(player, "money", sum);
                await money.incrementBalance(player, "bank", sum);
                player.call('notify:pushNotify', [2, 8, `Банковский счет пополнен на ${sum}$`, 3000]);
                break;
            }
        }
    }
})

/*mp.events.add("removeBalanceBank", async (player, sum) => {
    let balance = await money.getBalance(player, "bank");
    if(balance >= sum) {
        await money.decrementBalance(player, "bank", sum);
        await money.incrementBalance(player, "money", sum);
        player.notify("На балансе $" +await money.getBalanceSorting(player, "bank"))
    } else {
        player.notify("~r~На счету недостаточно средств.")
    }
})*/
/*
mp.events.add("placeBalanceBank", async (player, sum) => {
    let balance = await money.getBalance(player, "money");
    if(balance >= sum) {
        await money.incrementBalance(player, "bank", sum);
        await money.decrementBalance(player, "money", sum);
        player.notify("На руках $" +await money.getBalanceSorting(player, "money"))
    } else {
        player.notify("~r~На руках недостаточно средств.")
    }
})*/

console.log( banks.length <= 4 ? '[MoneySystem] Загружено ' +'\x1b[32m' +banks.length+ '\x1b[37m'+ ' банка.':'[MoneySystem] Загружено ' +'\x1b[32m' +banks.length+ '\x1b[37m'+ ' банков.');