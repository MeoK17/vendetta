function notify(type, layout, message, time) {
    var types = ['alert', 'error', 'success', 'information', 'warning'];
    var layouts = ['top', 'topLeft', 'topCenter', 'topRight', 'center', 'centerLeft', 'centerRight', 'bottom', 'bottomLeft', 'bottomCenter', 'bottomRight'];
    var icons = ['УВЕДОМЛЕНИЕ: ', 
                 'ОШИБКА: ', 
                 'УСПЕШНО: ', 
                 'ИНФОРМАЦИЯ: ', 
                 'ПРЕДУПРЕЖДЕНИЕ: '
    ];
    message = '<div class="text">'+icons[type]+message+'</div>';
    new Noty({
        type: types[type],
        layout: layouts[layout],
        theme: 'vendetta',
        text: message,
        timeout: time,
        progressBar: true,
        animation: {
            open: 'noty_effects_open',
            close: 'noty_effects_close'
        }
    }).show();
}