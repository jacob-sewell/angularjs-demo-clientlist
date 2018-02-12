(function() {
    'use strict';
    /* global angular */
    var nextSort = null;
    angular.module('clientList.sortcol.sortcol-directive', [])
        .directive('sortCol', SortColDirective);
    /**
     * See the repo's README.md for more discussion of this directive.
     * 
     * The nextSort private variable holds the sorters when the view is refreshed. It would probably 
     * be more orthodox to use a service to store that data, rather than a private variable.
     */

    function SortColDirective() {
        return {
            restrict: 'A',
            scope: {
                sorters: '=',
                updateSort: '&'
            },
            link: function(scope, element, attrs) {
                var el = element[0],
                    sortCol = attrs.sortCol,
                    i, sorter;
                if (nextSort === null) nextSort = scope.sorters;
                else if (nextSort.join(',') != scope.sorters.join(',')) scope.sorters = nextSort;
                if (sortCol) for (i in scope.sorters) {
                    sorter = scope.sorters[i];
                    if (sorter.substr(1) == sortCol) { // This column is part of the current sort set, apply attributes.
                        el.setAttribute('sort-dir', attrs.sortDir = sorter.charAt(0));
                        el.setAttribute('sort-index', i); // Could be used to hint at sort priority.
                        break;
                    }
                }
                el.onclick = clickHandler;
                
                function clickHandler() {
                    var newSorters = [],
                        found = false,
                        i, newSortDir, sorter;

                    switch (attrs.sortDir) {
                        case '+':
                            newSortDir = '-';
                        break;
                        case '-':
                            newSortDir = '';
                        break;
                        default:
                            newSortDir = '+';
                        break;
                    }
                    for (i in scope.sorters) {
                        sorter = scope.sorters[i];
                        if (sorter.substr(1) == sortCol) {
                            found = true;
                            if (newSortDir) newSorters.push(newSortDir + sortCol);
                        } else newSorters.push(sorter);
                    }
                    if (!found && newSortDir) newSorters.push(newSortDir + sortCol);
                    nextSort = newSorters;
                    scope.updateSort();
                }
            }
        };
    }
})();
