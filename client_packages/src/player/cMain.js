let lastCheck = 0;

mp.keys.bind(global.Keys.VK_E, false, function () { // E key
    if (new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    mp.events.callRemote('main:InteractionPressed');
    lastCheck = new Date().getTime();
});

mp.events.add("main:PlayerFreez", state => {
    mp.players.local.freezePosition(state);
});

mp.keys.bind(global.Keys.VK_OEM_3, false, function () { // ` key
    if (new Date().getTime() - lastCheck < 1000) return;
    mp.gui.cursor.visible = !mp.gui.cursor.visible;
    lastCheck = new Date().getTime();
});
