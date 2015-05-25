'use strict';

angular.module('flamingoApp')
  .controller('LogoutCtrl', function ($auth, $state) {
      $auth.logout();
      $state.go('main');
  });
 
