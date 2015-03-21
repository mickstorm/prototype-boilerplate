
'use strict';
//require angular and angualr packages
require('angular'); 

require('angular-router-browserify')(angular);
require('angular-local-storage');
require('angular-animate');

//require controllers
var HomeCtrl = require('./controllers/home'); 
var LoginCtrl = require('./controllers/login');

//setup app and routing
var app = angular.module('prototype', [
    'ngRoute',
    'LocalStorageModule',
    'ngAnimate'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/Login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

//end setyp and routes

//Controllers
app.controller('HomeCtrl', ['$scope', HomeCtrl]);
app.controller('LoginCtrl', ['$scope', LoginCtrl]);

