angular.module('comic-news-controllers', [])
.controller('login-controller', ['$scope', '$http', function($scope, $http) {
    this.login = function() {
        console.log('try login');
    }
}])
.controller('comic-news-list-controller', ['$scope','$http', function($scope,$http) {
    $http.get('data/data.json').success(function(data) {
        $scope.new_comics = data;
    });
}]);
