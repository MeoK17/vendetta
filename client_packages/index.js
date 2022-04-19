global.menuOpened = true;
global.menu = null;

global.menuCheck = function () {
    if (global.menuOpened) {
        return true;
    }
    return false;
};

global.menuClose = function () {
    mp.gui.cursor.visible = false;
    global.menuOpened = false;
    mp.events.call('hud:ShowHud', true);
    mp.events.call('main:PlayerFreez', false);
};

global.menuOpen = function () {
    mp.gui.cursor.visible = true;
    global.menuOpened = true;
    mp.events.call('hud:ShowHud', false);
    mp.events.call('main:PlayerFreez', true);
};

require ('./src/client/utils/cKeys');
require ('./src/utils/cNotify');
require ('./src/utils/cSkyCam');
require ('./src/utils/cDiscord');
require ('./src/core/cMoneySystem');
require ('./src/player/cCharacter');
require ('./src/player/cAuth');
require ('./src/player/cHud');
require ('./src/player/cMain');
require ('./src/admin/cFly');

var setTimeTimer = 0;
var date = new Date();

mp.game.time.setClockTime(date.getHours(), date.getMinutes(), date.getSeconds());

setInterval(function(){
	setTimeTimer++;
	if(setTimeTimer == 60)
	{
		var date = new Date();
        mp.game.time.setClockTime(date.getHours(), date.getMinutes(), date.getSeconds());	
		setTimeTimer = 0;
	}
}, 1000);

mp.game.audio.startAudioScene("CHARACTER_CHANGE_IN_SKY_SCENE");