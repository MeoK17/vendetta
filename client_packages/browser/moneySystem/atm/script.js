let atm = new Vue({
    el: '.atm',
    data: {
        active: false,
        money: 0
    },
    methods: {
        transition: function() {
            mp.trigger("moneySystem:Transition", JSON.stringify({type: "money", money: this.money}));
        },
        close: function() {
            this.money = 0;
            mp.trigger("moneySystem:HideAtmDialog");
        },
    }
})