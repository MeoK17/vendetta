const money = require ('./sMoneySystem');

let atms = [
    {x: -2975.49633, y: 380.15866, z: 14.04396},
    {x: -3143.76196, y: 1127.39611, z: 19.90155},
    {x: -387.09902, y: 6045.79296, z: 30.55012},
    {x: -283.49069, y: 6225.58935, z: 30.54433},
    {x: -133.45300, y: 6366.05224, z: 30.52541},
    {x: -155.30302, y: 6642.12646, z: 30.67233},
    {x: -174.67898, y: 6637.38085, z: 30.62706},
    {x: 1735.51330, y: 6411.20996, z: 34.08722},
    {x: 1701.85278, y: 6426.31640, z: 31.68780},
    {x: 315.49893, y: -593.82764, z: 42.33401},
];

let colshapes = [];

for(let i of atms) {
    colshapes.push(mp.colshapes.newRectangle(i.x, i.y, 1.2, 1.2));
    mp.markers.new(27, new mp.Vector3(i.x, i.y, i.z),1.2,{
        "color": [255, 255, 255, 150],
        "direction": 0,
        "dimension": 0,
        "visible": true
    });
    mp.blips.new(434, new mp.Vector3(i.x, i.y, i.z),{
        name: 'Банкомат',
        scale: 0.5,
        color: 26,
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
                player.setVariable('INTERACTIONCHECK', 2);
                break;
            }
        }
    },
    "playerExitColshape": (player, shape) => {
        for(let i of colshapes) {
            if(shape == i) {
                player.setVariable('INTERACTIONCHECK', 0);
                player.call("moneySystem:HideAtmDialog");
                break;
            }
        }
    }
})

console.log( atms.length <= 4 ? '[MoneySystem] Загружено ' +'\x1b[32m' +atms.length+ '\x1b[37m'+ ' банкомата.':'[MoneySystem] Загружено ' +'\x1b[32m' +atms.length+ '\x1b[37m'+ ' банкоматов.');