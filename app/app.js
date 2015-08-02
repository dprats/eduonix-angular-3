'use strict';

// Declare app level module which depends on views, and components
angular.module('myContactsApp', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
