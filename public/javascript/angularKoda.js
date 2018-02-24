    var app = angular.module("app", []);
    app.controller("demoController", function($scope, $http){
        $http.get("http://localhost:3000/getNaloge").then(function(data) {
            console.log('dela');
            $scope.naloge = data.data;
        });
    });