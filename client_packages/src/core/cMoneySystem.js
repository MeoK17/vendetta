let bank = mp.browsers.new("package://browser/moneySystem/bank/index.html");
let atm = mp.browsers.new("package://browser/moneySystem/atm/index.html");

mp.events.add("moneySystem:ShowBankDialog", () => {
    bank.execute("bank.active=true");
    global.menuOpen();
});

mp.events.add("moneySystem:HideBankDialog", () => {
    bank.execute("bank.active=false");
    global.menuClose();
});

mp.events.add("moneySystem:Transition", (json) => {
    mp.events.callRemote("moneySystem:Transition", json);
});

mp.events.add("moneySystem:ShowAtmDialog", () => {
    atm.execute("atm.active=true");
    global.menuOpen();
});

mp.events.add("moneySystem:HideAtmDialog", () => {
    atm.execute("atm.active=false");
    global.menuClose();
});