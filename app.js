(function() {
  'use strict';
  /* global angular */
  angular.module('clientList', [
    'ngRoute',
    'clientList.listView',
    'clientList.formView',
    'clientList.sortcol'
  ]);
})();
