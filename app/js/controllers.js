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

controllers.controller('ViewStudentController', ['$scope', '$routeParams', 'StudentService',
    function ($scope, $routeParams, StudentService) {
        $scope.student = StudentService.get($routeParams.id);
    }
]);

controllers.controller('EditStudentController', ['$scope', '$routeParams', '$location','StudentService',
    function ($scope, $routeParams, $location, StudentService) {
        $scope.student = StudentService.get($routeParams.id);
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

controllers.controller('ContactController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        $scope.captchaUrl = 'site/captcha';
        $scope.contact = function () {
            $scope.submitted = true;
            $scope.error = {};
            $http.post('api/contact', $scope.contactModel).success(
                function (data) {
                    $scope.contactModel = {};
                    $scope.flash = data.flash;
                    $window.scrollTo(0,0);
                    $scope.submitted = false;
                    $scope.captchaUrl = 'site/captcha' + '?' + new Date().getTime();
            }).error(
                function (data) {
                    angular.forEach(data, function (error) {
                        $scope.error[error.field] = error.message;
                    });
                }
            );
        };

        $scope.refreshCaptcha = function() {
            $http.get('site/captcha?refresh=1').success(function(data) {
                $scope.captchaUrl = data.url;
            });
        };
    }]);

controllers.controller('DashboardController', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('api/dashboard').success(function (data) {
           $scope.dashboard = data;
        })
    }
]);

controllers.controller('LoginController', ['$scope', '$http', '$window', '$location',
    function($scope, $http, $window, $location) {
        $scope.login = function () {
            $scope.submitted = true;
            $scope.error = {};
            $http.post('api/login', $scope.userModel).success(
                function (data) {
                    $window.sessionStorage.access_token = data.access_token;
                    $location.path('/dashboard').replace();
            }).error(
                function (data) {
                    angular.forEach(data, function (error) {
                        $scope.error[error.field] = error.message;
                    });
                }
            );
        };
    }
]);