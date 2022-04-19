var cam = mp.cameras.new('default', new mp.Vector3(-95, 19, 1182), new mp.Vector3(0, 0, 0), 70);
cam.pointAtCoord(-95, 19, 0);
cam.setActive(true);
mp.game.cam.renderScriptCams(true, false, 0, true, false);
mp.game.ui.displayAreaName(false);
mp.game.ui.displayRadar(false);
mp.game.ui.displayHud(false);
mp.gui.chat.show(false);

global.authCEF = false;

mp.events.add('auth:accountAuth', (data) => {
    mp.events.callRemote("auth:accountAuth", data);
});

mp.events.add('auth:accountRegistration', (data) => {
    mp.events.callRemote("auth:accountRegistration", data);
});

mp.events.add('auth:showAuthDialog', () => {
    global.authCEF = mp.browsers.new("package://browser/auth/index.html");
    //mp.gui.cursor.visible = true;
    global.menuOpen();
});

mp.events.add('auth:hideAuthDialog', () => {
    global.authCEF.destroy();
    global.authCEF = false;
    mp.game.cam.renderScriptCams(false, false, 0, false, false);
    /*mp.events.call('moveSkyCamera', mp.players.local, 'up', 1, false);
    setTimeout(function() {
        mp.events.call('moveSkyCamera', mp.players.local, 'down', 3, true);
    }, 10000) */
    global.menuClose();
    mp.gui.cursor.visible = false;
    mp.game.ui.displayAreaName(true);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
    mp.gui.chat.show(true);
});