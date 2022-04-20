let bank = new Vue({
    el: '.bank',
    data: {
        active: false,
        street: 'СЭНДИШОРС',
        playerName: 'Meo',
        money: null,
        position: 1,
        chapters: [
            {id: 1, name: 'Снять наличные', button: 'Снять', type: "money"},
            {id: 2, name: 'Пополнить счет', button: 'Пополнить', type: "bank"},
            /*{id: 3, name: 'Оплатить дом', button: 'Оплатить', type: "house"},
            {id: 4, name: 'Оплатить бизнес', button: 'Оплатить', type: "business"},*/
        ],
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
            mp.trigger("moneySystem:HideBankDialog");
        },
    }
})