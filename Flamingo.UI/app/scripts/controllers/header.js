'use strict';

angular.module('flamingoApp')
  .controller('HeaderCtrl', function ($scope, $auth) {
    $scope.isAuthenticated = $auth.isAuthenticated;
  });
