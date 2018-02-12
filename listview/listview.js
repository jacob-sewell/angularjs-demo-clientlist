(function() {
  'use strict';
  /* global angular */
  angular.module('clientList.listView', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'listview/listview.html',
        controller: 'ListViewController'
      });
    }])
    .controller('ListViewController', ['$scope', '$http', '$route', ListViewController]);

  function ListViewController($scope, $http, $route) {
    var vm = this;
    $scope.listView = vm;
    vm.sorters = ['+last_name', '+first_name'];
    vm.updateSort = updateSort;
    vm.load = load;

    vm.load();

    function updateSort() {
      $route.reload();
    }
    
    /**
     * The data loading here and in the FormViewController should probably be combined into one service.
     * And of course in an app of any size there'd be paging, and we'd have to do filtering and sorting 
     * remotely.
     */
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
          vm.clients = rows;
        }
      });
    }
  }
})()
