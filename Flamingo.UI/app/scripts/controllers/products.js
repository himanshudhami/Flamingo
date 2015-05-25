'use strict';

angular.module('flamingoApp')
  .controller('ProductsCtrl', function ($scope, $http, API_URL, alert) {

    $http.get(API_URL + 'products').success(function(products){
        $scope.products = products;
    }).error(function(err){
        alert('warning', 'Unable to get products', err.message);
    });
  });
