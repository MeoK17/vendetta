let bank = new Vue({
    el: '.bank',
    data: {
        active: false,
        money: 0,
        position: 1,
        chapters: [
            {id: 1, name: 'ПОПОЛНЕНИЕ', button: 'ПОПОЛНИТЬ', type: "bank"},
            {id: 2, name: 'СНЯТИЕ', button: 'СНЯТЬ', type: "money"},
            {id: 3, name: 'ДОМ', button: 'ОПЛАТИТЬ', type: "house"},
            {id: 4, name: 'БИЗНЕС', button: 'ОПЛАТИТЬ', type: "business"},
        ],
    },
    methods: {
        transition: function(type) {
            mp.trigger("moneySystem:Transition", JSON.stringify({type: type, money: this.money}));
        },
        close: function() {
            this.money = 0;
            mp.trigger("moneySystem:HideBankDialog");
        },
    }
})