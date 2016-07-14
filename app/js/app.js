'use strict';

var app = angular.module('app', [
    'ngRoute',          //$routeProvider
    'mgcrea.ngStrap',   //bs-navbar, data-match-route directives
    'controllers',       //Our module frontend/web/js/controllers.js
    'controllers'       //Our module frontend/web/js/controllers.js
]);

app.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/index.html',
                controller: 'HomeController'
            }).
            when('/view-student/:id', {
                templateUrl: 'partials/view-student.html',
                controller: 'ViewStudentController'
            }).
            when('/student', {
                templateUrl: 'partials/student.html',
                controller: 'ContactController'
            }).
            when('/create-student', {
                templateUrl: 'partials/create-student.html',
            }).
            otherwise({
                templateUrl: 'partials/404.html'
            });
    }
]);

app.service('StudentService', function () {
    //to create unique student id
    var uid = 1;

    //students array to hold list of all students
    var students = [
        {
            id: 1,
            'firstname': 'Viral',
            'lastname': 'Leo',
            'email': 'hello@gmail.com',
            'phone': '123-2343-44'
        },
        {
            id: 2,
            'firstname': 'Viral',
            'lastname': 'Leo',
            'email': 'hello@gmail.com',
            'phone': '123-2343-44'
        },
        {
            id: 3,
            'firstname': 'Viral',
            'lastname': 'Leo',
            'email': 'hello@gmail.com',
            'phone': '123-2343-44'
        },
    ];

    //save method create a new student if not already exists
    //else update the existing object
    this.save = function (student) {
        if (student.id == null) {
            //if this is new student, add it in students array
            student.id = uid++;
            student.push(student);
        } else {
            //for existing student, find this student using id
            //and update it.
            for (var i in students) {
                if (students[i].id == student.id) {
                    students[i] = student;
                }
            }
        }

    }

    //simply search students list for given id
    //and returns the student object if found
    this.get = function (id) {
        for (var i in students) {
            if (students[i].id == id) {
                return students[i];
            }
        }

    }

    //iterate through students list and delete 
    //student if found
    this.delete = function (id) {
        for (var i in students) {
            if (students[i].id == id) {
                students.splice(i, 1);
            }
        }
    }

    //simply returns the students list
    this.list = function () {
        return students;
    }
});
