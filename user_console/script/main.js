var app = angular.module('App', []);


app.controller('myCtrl', ['$scope','$http', function ($scope,$http)  {
    $scope.new_user = {};
    $scope.currentView = 'userTable';
    $scope.setCurrentView = function(view){
        $scope.currentView = view;
    };


	$http.get('data/data.json').success(function(data,status,headers){

		if(typeof(data)=='object')
			$scope.user_list = data;
		else
			$scope.user_list = [];
	});						

						
    $scope.remove_user = function(index){
        $scope.user_list.splice(index,1);
    };

	
    $scope.addUser = function(){
        $scope.action = 'addUser';
        $scope.setCurrentView('addUser');
    };

	
    $scope.edit_user = function(index){
        $scope.new_user = $scope.user_list[index];
        $scope.currentUserIndex = index;
        $scope.action = 'editUser';
        $scope.setCurrentView('addUser');
    };

	
    $scope.cancelEdit = function(){
		$scope.setCurrentView('userTable');
		$scope.new_user = $scope.clearData($scope.new_user);
	};
	
	
    $scope.saveUser = function(editForm){
        var new_user = $scope.new_user;
		
        if(editForm.$valid){
            if ($scope.action == 'addUser'){
                $scope.user_list.push({'name':new_user.name,'surname':new_user.surname,"age":new_user.age});
            }else if($scope.action == 'editUser'){
                $scope.user_list[$scope.currentUserIndex]={'name':new_user.name,'surname':new_user.surname,"age":new_user.age};
            }
            $scope.setCurrentView('userTable');
           
			$scope.new_user = $scope.clearData($scope.new_user);
        }
    }
	
	
	$scope.clearData = function(data){	
		angular.forEach(data, function(value, key) {
                data[key]='';
        });		
		return data;
	}
	
	
}]);
