let localplayer = mp.players.local;

global.bankCEF = mp.browsers.new("package://browser/moneySystem/bank/index.html");

mp.events.add("moneySystem:ShowBankDialog", () => {
    global.bankCEF.execute("bank.active=true");
    global.bankCEF.execute(`bank.street='${mp.game.ui.getStreetNameFromHashKey(mp.game.pathfind.getStreetNameAtCoord(localplayer.position.x, localplayer.position.y, localplayer.position.z, 0, 0).streetName)}'`);
    global.bankCEF.execute(`bank.playerName='${localplayer.name}'`);
    global.menuOpen();
});

mp.events.add("moneySystem:HideBankDialog", () => {
    global.bankCEF.execute("bank.active=false");
    global.menuClose();
});

global.atmCEF = mp.browsers.new("package://browser/moneySystem/atm/index.html");

mp.events.add("moneySystem:ShowAtmDialog", () => {
    global.atmCEF.execute(`bank.street='${mp.game.ui.getStreetNameFromHashKey(mp.game.pathfind.getStreetNameAtCoord(localplayer.position.x, localplayer.position.y, localplayer.position.z, 0, 0).streetName)}'`);
    global.atmCEF.execute(`bank.playerName='${localplayer.name}'`);
    global.atmCEF.execute("atm.active=true");
    global.menuOpen();
});

mp.events.add("moneySystem:HideAtmDialog", () => {
    global.atmCEF.execute("atm.active=false");
    global.menuClose();
});

mp.events.add("moneySystem:Transition", (json) => {
    mp.events.callRemote("moneySystem:Transition", json);
});