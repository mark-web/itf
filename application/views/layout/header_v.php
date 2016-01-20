<!DOCTYPE html>
<html>
<head>
    <title>Page title</title>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Description" content="" />
    <meta http-equiv="Keywords" content="" />

    <link rel="stylesheet" href="/css/style.css" />
    <script src="/lib/other/scripts/angular.min.js"></script>
    <script src="/lib/other/scripts/angular-route.min.js"></script>

</head>

<body ng-app>


<div id="main">
    <!-- Всем переменным классов в меню навигации будет присвоено значение "active". Функция $event.preventDefault() выводит страницу, которая была открыта по ссылке. -->
    <nav class="{{active}} nav navbar-nav" ng-click="$event.preventDefault()">
        <ul class="nav navbar-nav">
        <!-- Когда пункт меню открыт по ссылке, мы устанавливаем активные переменные -->
        <?
        foreach($menu as $key=>$val){
            echo '<li class = "'.$key.'">
                    <a id="'.$key.'" href="#" class="'.$key.' ajax-link" ng-click="active=\''.$key.'\'">'.$val.'</a>
                  </li>';
        }
        ?>
<!--        <a href="#" class="home" ng-click="active='home'">Home</a>-->
<!--        <a href="#" class="projects" ng-click="active='projects'">Projects</a>-->
<!--        <a href="#" class="services" ng-click="active='services'">Services</a>-->
<!--        <a href="#" class="contact" ng-click="active='contact'">Contact</a>-->
        </ul>
    </nav>
</div>
<section class="wrapper">
    <div class="container">
        <!-- ng-show выводит элемент, если значение переменной в кавычках соответствует истине. ng- hide – скрывает элемент, если наоборот. Так как изначально  активная переменная не установлена, то сперва на экране будет виден следующий текст -->
        <p ng-hide="active">Please click a menu item</p>
        <p ng-show="active">You chose <b>{{active}}</b></p>

        <!--<div ng-view></div>-->
    </div>
</section>

<!--<nav class="navbar navbar-default navbar-fixed-top">-->
<!--    <div class="container">-->
<!--        <div class="navbar-header">-->
<!---->
<!--            <a class="navbar-brand pointer" data-html="true" onclick="return false;" id = "device_info" >.....</a>-->
<!--        </div>-->
<!--        <div id="navbar">-->
<!--            <ul class="nav navbar-nav">-->
<!--                --><?//
//                    foreach($menu as $key=>$val){
//                        echo '<li class = "'.get_access_class($key).'"><a id="'.$key.'" class="ajax-link">'.$val.'</a></li>';
//                    }
//                ?>
<!--            </ul>-->
<!--        </div>-->
<!---->
<!--    </div>-->
<!--</nav>-->
<!--<div id="AccessModal" class="modal fade" role="dialog">-->
<!--    <div class="modal-dialog">-->
<!--        <div class="modal-content">-->
<!--            <div class="modal-header">-->
<!--                <button type="button" class="close" data-dismiss="modal">&times;</button>-->
<!--                <h4 class="modal-title">Доступ до сторінки</h4>-->
<!--            </div>-->
<!--            <div class="modal-body" id="AccessModal-body">-->
<!--            </div>-->
<!--            <div class="modal-footer">-->
<!--                <button type="button" class="btn btn-danger" data-dismiss="modal">Закрити</button>-->
<!--            </div>-->
<!--        </div>-->
<!---->
<!--    </div>-->
<!--</div>-->
<!---->
<!--<div id="loading_global" class="mess_gl">-->
<!--    <img width="35px" src="/lib/other/img/ajax_loader_gray_128.gif">&nbsp&nbsp Завантаження...-->
<!--</div>-->
<!--<div id="show_message" class="mess_gl"></div>-->
<!---->
