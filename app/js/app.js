'use strict';

var app = angular.module('app', [
    'ngRoute',          //$routeProvider
    'mgcrea.ngStrap',   //bs-navbar, data-match-route directives
    'ngMessages',   //form validate
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
            when('/edit-student/:id', {
                templateUrl: 'partials/edit-student.html',
                controller: 'EditStudentController'
            }).
            when('/create-student', {
                templateUrl: 'partials/create-student.html',
                controller: 'CreateStudentController'
            }).
            when('/student', {
                templateUrl: 'partials/student.html',
                controller: 'ContactController'
            }).
            otherwise({
                templateUrl: 'partials/404.html'
            });
    }
]);

app.service('StudentService', function () {
    //to create unique student id
    var uid = 4;

    //students array to hold list of all students
    var students = [
        {
            id: 1,
            'firstname': 'Viral',
            'lastname': 'Leo',
            'email': 'jetut@hotmail.com',
            'phone': '1234567890'
        },
        {
            id: 2,
            'firstname': 'Chanda',
            'lastname': 'Stout',
            'email': 'pujaricyma@hotmail.com',
            'phone': '2323232323'
        },
        {
            id: 3,
            'firstname': 'Leila',
            'lastname': 'Short',
            'email': 'mafoh@hotmail.com',
            'phone': '1232343444'
        },
    ];

    //save method create a new student if not already exists
    //else update the existing object
    this.save = function (student) {
        if (student.id == null) {
            //if this is new student, add it in students array
            student.id = uid++;
            students.push(student);
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
