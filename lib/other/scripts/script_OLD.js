function refresh_highlighter() {
    SyntaxHighlighter.highlight();

    var sh = $("#high_text .syntaxhighlighter");

    if (sh.length == 0) {
        sh.floatingScroll("destroy");
        $(".fl-scrolls").remove();
    } else {
        sh.floatingScroll("init");
        sh.floatingScroll("update");
    }
}

var ajax_request;

var Storage = {
    init: function (storage_name) {
        this.storage_name = storage_name;
        return this;
    },
    put:function(key,value){
        localStorage.setItem(key, value);
    },
    get:function(key){
        return localStorage.getItem(key);
    }
};

var History = {
    key:'ip_address',
    get: function () {
        return JSON.parse(Storage.get(this.key) || '[]');
    },
    put: function (value) {
        var data = this.get();

        if(!Array.isArray(data)){
            data = [];
        }

        var index = data.indexOf(value);

        if (index !== -1) {
            data.splice(index,1)
        }

        data.unshift(value);
        if(data.length>15){
            data.pop();
        }
        return Storage.put(this.key,JSON.stringify(data));
    }
};

function reload() {
    window.location.reload()
}

$(document).ready(function () {

    $("#device_info").on('mouseover', function () {
        $(this).attr('data-original-title', $('#device_info_tooltip').html());
    });

    $("#device_info").tooltip({placement: 'bottom', container: 'body'});

    refresh_page();
    createHistory();

    SyntaxHighlighter.defaults['quick-code'] = false;
    SyntaxHighlighter.all();

    $('#device_ip').mask('099.099.099.099');

    $('.orig_btn').on('click', function () {
        $('button[value=show]').toggle();
        $('button[value=hide]').toggle();
        $("#orig_text").slideToggle("slow");
    });

    // click event listener
    $('.ajax-link').click(function (event) {
        console.log('ajax-link clicked');
        console.log($(this).parent().attr('class'));
        if ($(this).parent().attr('class').indexOf('disabled') == -1) {
            var clickedLink = $(this).attr('id');
            console.log(clickedLink);
            if (clickedLink == 'groupCommand') {
                callGroupCommand();
                document.location.hash = clickedLink;
                $('#navbar li').removeClass('active');
                $(this).closest('li').addClass('active');
            } else {
                var ip = $('#device_ip').val().trim();
                if (event.ctrlKey) {
                    var url = window.location.href.split('#')[0];
                    if (ip_check(ip)) {
                        window.open(url + '#' + clickedLink + '_' + ip);
                    } else {
                        end_loading();
                        alertify.error('Невірний IP!');
                    }
                } else {
                    if (ip_check(ip)) {
                        console.log(clickedLink + '_' + ip);
                        document.location.hash = clickedLink + '_' + ip;
                        $('#navbar li').removeClass('active');
                        $(this).closest('li').addClass('active');
                        load_page(clickedLink);
                    } else {
                        end_loading();
                        alertify.error('Невірний IP!');
                    }
                    event.preventDefault();
                }
            }

        }
    });
    // click event listener
//-------крутилка

    function start_loading() {
        $('#loading_global').show();
    }

    function end_loading() {
        $('#loading_global').hide(100);
    }

    $('#device_ip').on('keyup change', function (e) {
        var flag = ip_check($(this).val());
        if (flag == true) {
            if (e.keyCode == 13) {
                refresh_page();
            }
        } else if (e.keyCode == 13) {
            end_loading();
            alertify.error('Невірний IP!');
        }
        return false;
    });


    $('#device_connect').on('click', function () {
        device_connect();
    });

    $('#device_info').on('click', function () {
        $('#myModal').modal('show');
    });
    //Вкладка Дії


});

function callGroupCommand() {
    start_loading();
    $.ajax({
        type: 'post',
        url: 'main/get_GroupCommand',
        data: {},
        success: function (data)
        {
            $(document).prop('title', 'Групові команди');
            $('#container').html(data);
            $('.cont').css('display', 'block');
            refresh_highlighter();
            rebind();
            end_loading();
        },
        error: function (data) {
            $('.cont').css('display', 'block');
            set_error(data.responseText);
            end_loading();
            alertify.error('Помилка запиту!');
        }
    });
}

function ip_check(ip) {
    if (typeof(ip) == "undefined") {
        flag = false;
    } else {
        ip = ip.trim();
        var ip_array = ip.split('.');
        var flag = true;
        if (ip_array.length != 4) {
            flag = false;
        } else {
            $.each(ip_array, function (key, val) {
                if (parseInt(val) < 0 || parseInt(val) > 255 || val == null || isNaN(val) || val.trim() == '') {
                    flag = false;
                }
            });
        }
    }
    return flag;
}

function load_page(clickedLink) {
    console.log('load_page');
    start_loading();
    var ip = $('#device_ip').val().trim();
    if (ip_check(ip)) {
        //добавление в историю
        History.put(ip);
        createHistory();
        //флаг отмены предыдущего запроса
        var abort = false;

        //отменяем запрос
        if(ajax_request!==undefined){
            ajax_request.abort();
            abort = true;
        }

        ajax_request = $.ajax({
            type: 'post',
            url: 'main/get_data',
            data: {method: clickedLink, ip: ip},
            success: function (data) {
                $(document).prop('title', $('#'+clickedLink).html());
                $('#container').html(data);
                $('.cont').css('display', 'block');
                refresh_highlighter();
                rebind();
                end_loading();
            },
            error: function (data) {
                if(!abort){
                    $('.cont').css('display', 'block');
                    set_error(data.responseText);
                    end_loading();
                    alertify.error('Помилка запиту!');
                }
            }
        });
    } else {
        end_loading();
        alertify.error('Невірний IP!');
    }
}

function send_action(url, variable, parametr) {
    console.log('send_action:' + url);
    console.log('variable:' + variable);

    var ip = $('#device_ip').val().trim();
    if (ip_check(ip)) {
        start_loading();
        $.ajax({
            type: 'post',
            url: 'main/send_action',
            data: {url: url, variable: variable, additional_param: parametr, ip: $('#device_ip').val().trim()},
            success: function (data) {
                if (get_method() != 'actions') {
                    refresh_page(500);
                }
                end_loading();
            },
            error: function (data) {
                set_error(data.responseText);
                end_loading();
                alertify.error('Помилка запиту!');
            }
        });
    } else {
        end_loading();
        alertify.error('Невірний IP!');
    }
}

function set_parameters(action, parameters) {

    var ip = $('#device_ip').val().trim();
    if (ip_check(ip)) {
        console.log('set_parameters:' + parameters);
        start_loading();
        $.ajax({
            type: 'post',
            url: 'main/set_parameters/' + action,
            data: {parameters: parameters, ip: ip},
            success: function (data) {
                if (get_method() != 'actions') {
                    refresh_page(500);
                }
                end_loading();
            },
            error: function (data) {
                set_error(data.responseText);
                end_loading();
                alertify.error('Помилка запиту!');
            }
        });
    } else {
        end_loading();
        alertify.error('Невірний IP!');
    }
}

function set_error(error) {
    $('.error_block').html("<div class=''><span class='alert alert-danger'><img src='../lib/other/img/alert.png' width='35px' height='35px'>" +
        "&nbsp&nbsp " + error + "</div><br><br>");
}

function saveTrace() {
    var ip_form = $('#device_ip').val().trim();
    if (ip_check(ip_form) == true) {
        window.location.replace('main/saveTrace/' + ip_form);
    } else {
        end_loading();
        alertify.error('Невірний IP!');
    }
}

function get_method() {
    return document.location.hash.split('_')[0].replace("#", "");
}

function rebind() {
    $('.orig_btn').unbind('click');
    $('.orig_btn').bind('click', function () {
        $('button[value=show]').toggle();
        $('button[value=hide]').toggle();
        $("#orig_text").slideToggle("slow");
    });

    $('.addScreen').click(function () {
        var form = $(this).closest('form').attr('id');
        var area = $('#' + form + ' textarea[name=actionValue]');
        area.val('<screen>\n' + area.val().trim() + '\n</screen>');
    });

    $('#sourceSwitcher').bootstrapSwitch().on('switchChange.bootstrapSwitch', function (event, state) {
        console.log($('#sourceSwitcher').bootstrapSwitch('state')); // true | false
        $('.actionName').toggleClass('hidden')
    });

    $('input[name=actionValueFile]').change(function () {
        var form = $(this).closest('form').attr('id');
        var ext = $(this).val().split('.').pop().toLowerCase();
        var allowed = ['txt', 'xml', 'xslt', 'html', 'log'];
        var options = {
            url: '/main/getFileContent',
            type: 'post',
            success: function (data) {
                $('#' + form + ' textarea[name=actionValue]').val(data);
                end_loading();
            }
        };
        console.log($(this));

        if (allowed.indexOf(ext) == -1) {
            alertify.error("Тип файла заборонений! Дозволено " + allowed.toString() + '.');
        } else {
            start_loading();
            $("#" + form).ajaxSubmit(options);
        }
    });

    $('#moneyData').bind('change keyup mouseleave',function(e){
        console.log('event');
        var money_val = parseFloat($(this).val());
        console.log(money_val);
        if(isNaN(money_val) || money_val == undefined){
            $(this).val(0)
        }else{
            $(this).val(money_val);
        }
    });
}

function refresh_page(ms) {
    console.log('refresh_page');
    ms = typeof ms !== 'undefined' ? ms : 0;
    setTimeout(function () {
        var hash = document.location.hash;
        console.log('hash' + hash);
        if (hash == '') {
            document.location.hash = 'screen';
        }
        var method = get_method();
        console.log('method: ' + method);
        $('#navbar li').removeClass('active');
        $('#' + method).closest('li').addClass('active');

        if (method == 'groupCommand') {
            callGroupCommand();
            document.location.hash = method;
        } else {
            var ip = hash.split('_')[1];
            var ip_form = $('#device_ip').val().trim();

            if (ip_check(ip_form) == true) {
                console.log('ip checked form');
                console.log(method + '_' + ip_form);
                document.location.hash = method + '_' + ip_form;
                console.log(document.location.hash);
                load_page(method);
            } else if (ip_check(ip) == true) {
                console.log('ip checked');
                $('#device_ip').val(hash.split('_')[1]);
                load_page(method);
            }
        }
    }, ms);

}

//-------крутилка


//-------крутилка

function start_loading() {
    $('#loading_global').show();
}

function end_loading() {
    $('#loading_global').hide(100);
}

function setTitle() {
    $(".title").on('mouseover', function () {
        $(this).tooltip({placement: 'bottom', container: 'body'});
    });
}

function callAdmin() {
    start_loading();
    $.ajax({
        type: 'post',
        url: 'main/get_page_access',
        data: {},
        success: function (data) {
            $('#AccessModal-body').html(data);
            $('#userSwitcher').bootstrapSwitch().on('switchChange.bootstrapSwitch', function (event, state) {
                console.log($('#userSwitcher').bootstrapSwitch('state')); // true | false
            });
            $('#AccessModal').modal('show');
            end_loading();

            $(".prof").popover({
                html: true,
                placement:'left',
                trigger: 'hover',
                content: function () {
                    return '<img class="middle_photo" src="'+$(this).attr('src') + '" /><div class="popover_div">'+$(this).attr('data-add-reason') + "</div>";
                }
            });

        },
        error: function (data) {
            end_loading();
            alertify.error('Помилка запиту!');
        }
    });
}

function addUser() {

    var new_ldap = $('input[name=new_ldap]').val().trim();
    var add_reason = $('input[name=add_reason]').val().trim();
    if (new_ldap != '') {

        var is_admin = 0;

        if (!$('#userSwitcher').bootstrapSwitch('state')) {
            is_admin = 1;
        }

        start_loading();
        $.ajax({
            type: 'post',
            url: 'main/add_user',
            data: {user: new_ldap,add_reason:add_reason,is_admin:is_admin},
            success: function (data) {
                callAdmin();
            },
            error: function (data) {
                end_loading();
                alertify.error(data.responseText);
            }
        });
    }
}

function changeUserAccess(ldap, access) {
    var checked = $("input[name=" + ldap + '_' + access + "]").prop("checked");
    start_loading();
    $.ajax({
        type: 'post',
        url: 'main/edit_user',
        data: {ldap: ldap, access: access, checked: checked},
        success: function (data) {
            if($('#' + ldap +"_row input[type='checkbox']:checked").length===0){
                $('#' + ldap +"_row").remove();
            }
            end_loading();
        },
        error: function (data) {
            end_loading();
            alertify.error(data.responseText);
        }
    });
}

function download_screenshot(filename) {
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.download = filename + '.jpg';
    link.href = document.getElementById('check_image').getAttribute('src');
    link.click();
    link.remove();
}

//--------actions
function send_command() {
    var name;
    if ($('#sourceSwitcher').bootstrapSwitch('state')) {
        name = $('#actionName').val();
    } else {
        name = $('#actionNameCustom').val();
    }

    set_parameters('action', 'name=' + name + '&value=' + $('textarea[name=actionValue]').val());
}
//--------history созадаем меню истории
function createHistory(){
    var history = History.get();
    var output = '<li><input class="form-control" maxlength="8" placeholder="Номер терміналу" type="text" name = "terminal_name"></li>';
    $.each(history,function(key,val){
        output += '<li><a  onclick="set_terminal_ip(\''+val+'\')">'+val+'</a></li>';
    });
    $('#history').html(output);
    get_term_ip();
}

//получаем ип введенного терминала
function get_term_ip(){
    $("input[name=terminal_name]").bind('change keyup' ,function () {
        console.log('aaaaaa');
            if ($(this).val().length == 8) {
                $.ajax({
                    type: 'post',
                    url: 'main/get_term_ip',
                    data: {compassname: $(this).val()},
                    success: function (data) {
                        set_terminal_ip(data.trim())
                    },
                    error: function (data) {
                        end_loading();
                        alertify.error(data.responseText);
                    }
                });

            }
        }
    )
}

//устанавливаем ип терминала с истории
function set_terminal_ip(ip){
    $('#device_ip').val(ip);
    refresh_page();
}