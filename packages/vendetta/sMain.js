mp.events.add("main:InteractionPressed", (player) => {
    let id = 0;
    id = player.getVariable('INTERACTIONCHECK');
    switch (id) {
        case 1: {
            player.call("moneySystem:ShowBankDialog");
            break;
        }
        case 2: {
            player.call("moneySystem:ShowAtmDialog");
            break;
        }
    }
});

mp.events.add({
    "playerEnterColshape": (player, shape) => {
        player.call("main:PlayerInteractionCheck", [true]);
    },
    "playerExitColshape": (player, shape) => {
        player.call("main:PlayerInteractionCheck", [false]);
    }
});
