
'use strict';

var angular = require('angular'); // That's right! We can just require angular as if we were in node
require('angular-router-browserify')(angular);
var HomeCtrl = require('./controllers/home'); // We can use our WelcomeCtrl.js as a module. Rainbows.

angular.module('prototype', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

//END ROUTES

//Controllers
angular.module('prototype',[]).controller('HomeCtrl', ['$scope', HomeCtrl]);

