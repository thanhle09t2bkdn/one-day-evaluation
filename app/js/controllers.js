'use strict';

var controllers = angular.module('controllers', []);

controllers.controller('MainController', ['$scope', '$location', '$window',
    function ($scope, $location, $window) {
        $scope.back = function(scope, element, attrs) {
             window.history.back();
       };
    }
]);
controllers.controller('HomeController', ['$scope', 'StudentService',
    function ($scope, StudentService) {
        $scope.students = StudentService.list();
        $scope.delete = function (id) {
            if(confirm("Do you want to delete this item?")){
                StudentService.delete(id);
            }
        }

    }
]);

controllers.controller('ViewStudentController', ['$scope', '$routeParams', '$location', 'StudentService',
    function ($scope, $routeParams, $location, StudentService) {        
        $scope.student = StudentService.get($routeParams.id);
        if($scope.student == null){
            $location.path('/404').replace();
        }
    }
]);

controllers.controller('EditStudentController', ['$scope', '$routeParams', '$location','StudentService',
    function ($scope, $routeParams, $location, StudentService) {
        $scope.student = StudentService.get($routeParams.id);
        if($scope.student == null){
            $location.path('/404').replace();
        }
        $scope.submit = function(){
            StudentService.save($scope.student);
            $location.path('/').replace();
        };
    }
    
]);
controllers.controller('CreateStudentController', ['$scope', '$routeParams', '$location','StudentService',
    function ($scope, $routeParams, $location, StudentService) {
        $scope.student = {};
        $scope.submit = function(){
            StudentService.save($scope.student);
            $location.path('/').replace();
        };
    }
    
]);
