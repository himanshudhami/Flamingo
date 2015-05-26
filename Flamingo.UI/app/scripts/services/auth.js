'use strict';

angular.module('flamingoApp')
  .service('auth', function ($http, API_URL, authToken, $state) {

    function authSuccessful(res) {
      authToken.setToken(res.token);
      $state.go('main');
    }

    this.login = function (email, password) {
      console.log(email,password);
      return $http.post(API_URL + 'login', {
        email: email,
        password: password
      }).success(authSuccessful);
    };

    this.register = function (firstName, lastName, email, password) {
      console.log(email, password, firstName, lastName);      
      return $http.post(API_URL + 'register', {
        email: email,
        password: password
      }).success(authSuccessful);
    };

  });
