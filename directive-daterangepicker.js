(function() {
    var app = angular.module('daterangepicker', []);

    /**
     * daterangepicker
     * @example
     * <input ng-model="xxx" daterangepicker daterangepicker-config="queryDateConfig" type="text">
     */
    app.directive('daterangepicker', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                ngModel: '=',
                daterangepickerConfig: '='
            },
            link: function(scope, element, attrs) {
                var defaults = {};

                // config to view
                scope.$watch('daterangepickerConfig', function(newVal) {
                    $(element)
                        .dateRangePicker(angular.extend(defaults, newVal))
                        .on('datepicker-change', function(event, obj) {
                            // view to model
                            scope.ngModel = obj.value;
                            scope.$apply();
                        });
                });

                // model to view
                scope.$watch('ngModel', function(newVal) {
                    if(!newVal || Object.keys(newVal).length <= 0) {
                        return scope.ngModel = null;
                    }
                });
            }
        }
    });
})();