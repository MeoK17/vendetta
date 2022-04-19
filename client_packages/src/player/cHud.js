let hud = mp.browsers.new("package://browser/hud/index.html");

mp.events.add("hud:ShowHud", status => {
    if(status) {
        hud.execute('hud.active=true');
        mp.game.ui.displayAreaName(true);
        mp.game.ui.displayRadar(true);
        mp.game.ui.displayHud(true);
        mp.gui.chat.show(true);
    } else {
        hud.execute('hud.active=false');
        mp.game.ui.displayAreaName(false);
        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        mp.gui.chat.show(false);
    }
});

mp.events.add("hud:MoneyChangedHud", money => {
    hud.execute(`hud.money='${money}'`);
});

mp.events.add("hud:BankChangedHud", bank => {
    hud.execute(`hud.bank='${bank}'`);
});