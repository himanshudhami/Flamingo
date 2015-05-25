'use strict';

angular.module('flamingoApp')
  .controller('SalesCtrl', function ($scope, $http, API_URL, alert) {

    $http.get(API_URL + 'sales').success(function(sales){
        $scope.sales = sales;
    }).error(function(err){
        alert('warning', 'Unable to get Sales Report', err.message);
    });
  });

