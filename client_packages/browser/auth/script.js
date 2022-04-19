let auth = new Vue({
    el: '.container',
    data: {
        auth: true,
        register: false,
        restore: false,
        email: '',
        login: '',
        password: '',
        confirmPassword: ''
    },
    methods: {
        clearData: function() {
            this.email = '';
            this.login = '';
            this.password = '';
            this.confirmPassword = '';
        },
        select: function(id) {
            switch(id) {
                case 'auth':
                    if(!this.login) return mp.trigger('notify:pushNotify', 1, 1, 'Введите логин', 3000);
                    if(this.login.length < 3) return mp.trigger('notify:pushNotify', 1, 1, 'Логин слишком короткий', 3000);
                    if(!this.password) return mp.trigger('notify:pushNotify', 1, 1, 'Введите пароль', 3000);
                    if(this.password.length < 6) return mp.trigger('notify:pushNotify', 1, 1, 'Пароль слишком короткий', 3000);
                    mp.trigger('auth:accountAuth', JSON.stringify({login: this.login, password: this.password}));
                    break;
                case 'register':
                    if(!this.email) return mp.trigger('notify:pushNotify', 1, 1, 'Введите почту', 3000);
                    if(!/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i.test(this.email)) return mp.trigger('notify:pushNotify', 1, 1, 'Почта введена не верно', 3000);
                    if(!this.login) return mp.trigger('notify:pushNotify', 1, 1, 'Введите логин', 3000);
                    if(this.login.length < 3) return mp.trigger('notify:pushNotify', 1, 1, 'Логин слишком короткий', 3000);
                    if(!this.password) return mp.trigger('notify:pushNotify', 1, 1, 'Введите пароль', 3000);
                    if(this.password.length < 6) return mp.trigger('notify:pushNotify', 1, 1, 'Пароль слишком короткий', 3000);
                    if(this.password != this.confirmPassword) return mp.trigger('notify:pushNotify', 1, 1, 'Пароли не совпадают', 3000);
                    mp.trigger('auth:accountRegistration', JSON.stringify({email: this.email, login: this.login, password: this.password}));
                    break;
                case 'restore':
                    if(!this.email) return mp.trigger('notify:pushNotify', 1, 1, 'Введите почту', 3000);
                    if(!/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i.test(this.email)) return mp.trigger('notify:pushNotify', 1, 1, 'Почта введена не верно', 3000);
                    //mp.trigger('auth:accountAuth', JSON.stringify({login: this.login, password: this.password}));
                    break;
                case 'registerShow':
                    this.auth = false;
                    this.register = true;
                    this.restore = false;
                    this.clearData();
                    break;
                case 'authShow':
                    this.auth = true;
                    this.register = false;
                    this.restore = false;
                    this.clearData();
                    break;
                case 'restoreShow':
                    this.auth = false;
                    this.register = false;
                    this.restore = true;
                    this.clearData();
                    break;
                default:
                    mp.trigger('notify:pushNotify', 1, 8, 'Свяжитесь с администратором', 3000);
                    break;
            }
        }
    }
});