var mainApp = angular.module('app', ['ngRoute']);

mainApp.config(['$routeProvider', function ($routeProvide) {
    $routeProvide
        .when('/',{
            template:'<h1>This is main page</h1>'
        })
        .when('/users',{
            templateUrl:'templates/users.html',
            controller:'usersCtrl'
        })
        .when('/events',{
            templateUrl:'templates/events.html',
            controller:'eventsCtrl'
        })
        .when('/contacts',{
            templateUrl:'templates/contacts.html',
            controller:'contactsCtrl'
        })
        .otherwise('/',{
            redirectTo:'/'
        })
}]);

mainApp.controller('mainCtrl', function ($scope, $http, $location) {


});


mainApp.controller('usersCtrl', function ($scope, $http, $location) {
    var url = '/index.php/Users/Get';
    $http.get(url).success(function(data){
        $scope.users = data;
    });

});

mainApp.controller('eventsCtrl', function ($scope, $http, $location) {
    var url = '/index.php/Events/Get';
    $http.get(url).success(function(data){
        $scope.events = data;
    });

});


mainApp.controller('contactsCtrl', function ($scope, $http, $location) {
    var url = 'data/contacts.json';
    $http.get(url).success(function(data){
        $scope.contacts = data;
    });

});


//var mainApp = angular.module('app', ['ngRoute']);
//

//
//mainApp.controller('aboutCtrl', function ($scope, $http, $location) {
//
//});
//

//
//mainApp.controller('navCtrl', function ($scope) {
//
//    $scope.test = '123';
//
//    $scope.notSorted = function(obj){
//        if (!obj) {
//            return [];
//        }
//        return Object.keys(obj);
//    };
//
//    $scope.menu = {
//        'about': 'Обо мне',
//        'users': 'Пользователи'
//    };
//
//    $scope.checkActiveItem = function (item) {
//        return $scope.item === item;
//    };
//
//    $scope.setActiveItem = function (item) {
//        $scope.item = item;
//    };
//});
