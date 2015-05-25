'use strict';

/**
 * @ngdoc function
 * @name flamingoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flamingoApp
 */
angular.module('flamingoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
