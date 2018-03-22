    var app = angular.module("app", []);
    app.controller("demoController", function($scope, $http){
        $http.get("http://127.0.0.1:3000/getNaloge").then(function(data) {
            console.log('dela');
            $scope.naloge = data.data;
        });
    });