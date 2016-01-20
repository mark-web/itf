
var current_log = new Date();
current_log = 'log_'+current_log.getFullYear() +'-'+ ('0'+(current_log.getMonth()+1)).slice(-2) +'-'+ ('0' + current_log.getDate()).slice(-2)+'.log';



function start_loading() {
    $('#loading_global').show();
}

function end_loading() {
    $('#loading_global').hide(100);
}

function get_logs(filename) {
    start_loading();
    $.ajax({
        type: 'post',
        url: 'get_log',
        data: {filename:filename},
        success: function (data) {
            current_log = filename;
            $('#log_body').html(data);
            end_loading();
        },
        error: function (data) {
            end_loading();
            alertify.error('Помилка запиту!');
        }
    });
}

function refresh_page() {
    get_logs(current_log);
}

get_logs(current_log);