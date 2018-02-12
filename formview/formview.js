(function() {
  'use strict';
  /* global angular */
  /**
   * The clientList.formView module and FormViewController pertain to the client editing form.
   * There should be a fancy datepicker.
   */
  angular.module('clientList.formView', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/edit/:clientId', {
        templateUrl: 'formview/formview.html',
        controller: 'FormViewController'
      });
    }])
    .controller('FormViewController', ['$scope', '$routeParams', '$http', '$filter', FormViewController]);
  
  function FormViewController($scope, $routeParams, $http, $filter) {
    var vm = this;
    $scope.formView = vm;
    vm.load = load;
    vm.submit = submit;

    vm.load();

    function load() {
      $http({
        url: 'data/clients.json'
      }).catch(function() {
        return { data: { success: false, message: 'Invalid server response.' } };
      }).then(function(response) {
        var data = response && response.data,
          success = data && data.success,
          rows = data && data.rows,
          message = data && data.message;
        if (!success) {
          console && console.error && console.error(message || response);
        } else {
          vm.client = $filter('filter')(rows, function(row) { return row.client_id == $routeParams.clientId; }).pop();
        }
      });
    }

    function submit() {
      $http.post(
        'data/actions.php?action=update',
        vm.client
      ).catch(function() {
        return { data: { success: false, message: 'Invalid server response.' } };
      }).then(function(response) {
        var data = response && response.data,
          success = data && data.success,
          message = data && data.message;
        if (!success) {
          console && console.error && console.error(message || response);
          vm.formError = message || 'Invalid server response.';
        } else {
          // back to the listing
          document.location.href = '#/';
        }
      });
    }
  }
})();
