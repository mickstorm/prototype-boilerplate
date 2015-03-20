

var angular = require('angular');
var HomeCtrl = require('./controllers/home');
var HomeCtrl = require('./controllers/login');


var app = angular.module('prototype',[
	'ui.sortable',
	'LocalStorageModule',
	'ngRoute',
	'ngSanitize'
]).config(['$locationProvider', '$routeProvider', function (locationProvider, routeProvider) {
  //locationProvider.html5Mode(true).hashPrefix('!');
  //routes
  routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'LoginCtrl'
 });








//app.controller('HomeCtrl', ['$scope', HomeCtrl]);
//app.controller('LoginCtrl', ['$scope', LoginCtrl]);

