var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(['$routeProvider', function ($routeProvide) {
    $routeProvide
        .when('/',{
            templateUrl:'index.html',
            controller:'navCtrl'
        }) .when('/about',{
            templateUrl:'templates/about.php',
            controller:'aboutCtrl'
        }).when('/userList',{
            templateUrl:'templates/users.php',
            controller:'usersCtrl'
        }).otherwise('/',{
            redirectTo:'/'
        })
}]);

mainApp.controller('aboutCtrl', function ($scope, $http, $location) {

});

mainApp.controller('usersCtrl', function ($scope, $http, $location) {
    var url = 'data/users.json';
    $http.get(url).success(function(data){
        $scope.address = data.address;
        $scope.mail = data.mail;
        $scope.phone1 = data.phone1;
        $scope.phone2 = data.phone2;
    });

});

mainApp.controller('navCtrl', function ($scope) {

    $scope.test = '123';

    $scope.notSorted = function(obj){
        if (!obj) {
            return [];
        }
        return Object.keys(obj);
    };

    $scope.menu = {
        'about': 'Обо мне',
        'users': 'Пользователи'
    };

    $scope.checkActiveItem = function (item) {
        return $scope.item === item;
    };

    $scope.setActiveItem = function (item) {
        $scope.item = item;
    };
});
