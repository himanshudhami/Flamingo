'use strict';

describe('Controller: SalesCtrl', function () {

  // load the controller's module
  beforeEach(module('tokensApp'));

  var SalesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SalesCtrl = $controller('SalesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
