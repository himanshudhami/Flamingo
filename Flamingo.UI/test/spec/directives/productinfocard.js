'use strict';

describe('Directive: productInfoCard', function () {

  // load the directive's module
  beforeEach(module('tokensApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<product-info-card></product-info-card>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the productInfoCard directive');
  }));
});
