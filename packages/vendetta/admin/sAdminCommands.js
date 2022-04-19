const fs = require("fs");
const saveFile = "saved_posistion.txt";
const money = require ('../core/moneySystem/sMoneySystem');

mp.events.addCommand({
    "savepos" : (player, name) => {
        if (player.admin < 5) return player.outputChatBox('!{ff4c5b}Команда savepos не найдена!');
        if (name == undefined) return player.outputChatBox('!{ffa161}/savepos [name]');
        fs.appendFile(saveFile, `Название: ${name} | Игрок: ${player.name} | Координаты: x: ${player.position.x.toFixed(5)}, y: ${player.position.y.toFixed(5)}, z: ${player.position.z.toFixed(5)} | Поворот: ${player.heading}\n`, (err) => {
            if (err) {
                player.notify(`~r~Координаты не сохранены. ~g~${err.message}`);
            } else {
                player.notify(`~b~Координаты сохранены в файл. ~g~${saveFile}`);
            }
        })
    },

    "veh": (player, _, veh) => {
        if(player.admin < 1) return player.outputChatBox("!{red}У вас недостаточно прав")
        if(veh == undefined) return player.outputChatBox("!{ffa161}/veh [model]")
        
        var adminVeh = mp.vehicles.new(mp.joaat(veh), new mp.Vector3(player.position.x, player.position.y, player.position.z), {numberPlate: "ADMIN",})
        player.putIntoVehicle(adminVeh, 0);
    },

    "givemoney": async (player, _, id, ammout) => {
        if (player.admin < 5) return player.outputChatBox('!{red}У вас недостаточно прав');
        if (id == undefined || money == undefined) return player.outputChatBox('!{ffa161}/givemoney [id] [количество]');
        let target = mp.players.at(id);
        if (target == null) return player.outputChatBox('!{red}Игрок с таким id не найден!');
        await money.incrementBalance(target, "money", ammout);
        player.outputChatBox(`!{red}Игроку: ${target.name} выдано $${ammout}`);
    },

    "setmoney": async (player, _, id, ammout) => {
        if (player.admin < 5) return player.outputChatBox('!{red}У вас недостаточно прав');
        if (id == undefined || ammout == undefined) return player.outputChatBox('!{ffa161}/setmoney [id] [количество]');
        let target = mp.players.at(id);
        if (target == null) return player.outputChatBox('!{red}Игрок с таким id не найден!');
        await money.setBalance(target, "money", ammout);
        player.outputChatBox(`!{red}Игроку: ${target.name} выдано $${ammout}`);
    },

    "getmoney": async (player, _, id) => {
        if (player.admin < 5) return player.outputChatBox('!{red}У вас недостаточно прав');
        if (id == undefined) return player.outputChatBox('!{ffa161}/getmoney [id]');
        let target = mp.players.at(id);
        if (target == null) return player.outputChatBox('!{red}Игрок с таким id не найден!');
        player.outputChatBox(`!{red}У игрока: ${target.name} - В кошелке: $${await money.getBalance(target, "money")} | На карте: $${await money.getBalance(target, "bank")}`);
    },

    "givebank": async (player, _, id, ammout) => {
        if (player.admin < 5) return player.outputChatBox('!{red}У вас недостаточно прав');
        if (id == undefined || money == undefined) return player.outputChatBox('!{ffa161}/givebank [id] [количество]');
        let target = mp.players.at(id);
        if (target == null) return player.outputChatBox('!{red}Игрок с таким id не найден!');
        await money.incrementBalance(target, "bank", ammout);
        player.outputChatBox(`!{red}Игроку: ${target.name} выдано $${ammout}`);
    },

    "setbank": async (player, _, id, ammout) => {
        if (player.admin < 5) return player.outputChatBox('!{red}У вас недостаточно прав');
        if (id == undefined || ammout == undefined) return player.outputChatBox('!{ffa161}/setmoney [id] [количество]');
        let target = mp.players.at(id);
        if (target == null) return player.outputChatBox('!{red}Игрок с таким id не найден!');
        await money.setBalance(target, "bank", ammout);
        player.outputChatBox(`!{red}Игроку: ${target.name} выдано $${ammout}`);
    },

    "creator": async (player) => {
        if (player.admin < 5) return player.outputChatBox('!{red}У вас недостаточно прав');
        player.position = new mp.Vector3(402.8664, -996.4108, -99.00027);
        player.heading = -185.0;
        player.call("CreatorCamera")
    },
})