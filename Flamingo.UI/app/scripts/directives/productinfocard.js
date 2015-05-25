'use strict';

angular.module('flamingoApp')
  .directive('productInfoCard', function () {
		return {
			templateUrl: 'views/productInfoCard.html',
			restrict: 'E',
			scope: {
				product: '=',
				initialCollapsed: '@collapsed'
			},
			controller: function($scope) {
				$scope.collapsed = ($scope.initialCollapsed === 'true');
				$scope.collapse = function() {
					$scope.collapsed = !$scope.collapsed;
				};
				$scope.purchase = function(product) {
					console.log(product.name,' is purchased');
				};
			}
		};
  });
