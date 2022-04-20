let atm = new Vue({
    el: '.atm',
    data: {
        active: false,
        street: 'СЭНДИШОРС',
        playerName: 'Meo',
        money: null,
        takePosition: null,
        takesSum: [
            {id: 1, sum: 10},
            {id: 2, sum: 25},
            {id: 3, sum: 50},
            {id: 4, sum: 100},
            {id: 5, sum: 1000},
            {id: 6, sum: 2000},
        ],
    },
    methods: {
        transition: function(type) {
            mp.trigger("moneySystem:Transition", JSON.stringify({type: type, money: this.money}));
        },
        close: function() {
            this.money = null;
            this.takePosition = null;
            mp.trigger("moneySystem:HideAtmDialog");
        },
    }
})