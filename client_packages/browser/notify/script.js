function notify(type, layout, message, time) {
    var types = ['warning', 'error', 'success', 'information'];
    var layouts = ['top', 'topLeft', 'topCenter', 'topRight', 'center', 'centerLeft', 'centerRight', 'bottom', 'bottomLeft', 'bottomCenter', 'bottomRight'];
    var icons = ['<div class="border yellow"></div>',//0 Предупреждение
                 '<div class="border red"></div>',   //1 Ошибка
                 '<div class="border green"></div>', //2 Успешно
                 '<div class="border blue"></div>'   //3 Предупреждение
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