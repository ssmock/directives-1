/**
 * Simple ASCII activity indicator.  Useful for indicating activity in progress,
 * like waiting for a response from the server.
 *
 * <button ng-click="main.Working1 = !main.Working1">
 *   <d-spinner show="main.Working1"></d-spinner>
 *   Toggle Spinner 1
 * </button>
 */
"use strict";

angular.module("app").directive("dSpinner", dSpinner);

dSpinner.$inject = ["$interval"];

function dSpinner($interval) {
    var scope = {
        show: "="
    };

    var directive = {
        restrict: "E",
        scope: scope,
        template: "<span ng-show='show' ng-style='style' ng-bind='display'></span>",
        link: link
    };

    return directive;

    function link(scope) {
        scope.$watch("show", onShowChange);

        scope.style = {
            fontFamily: "'Lucida Console', Monaco, monospace",
            fontSize: "8pt"
        };

        var chars = "-\\|/";
        //var chars = ".:':"; // For a bouncing dot effect
        var length = chars.length;
        var current = 0;
        var promise;

        function onShowChange(val) {
            if (val) {
                promise = $interval(render, 160);
            }
            else {
                $interval.cancel(promise);
            }
        }

        function render() {
            current = current + 1 === length ? 0 : current + 1;

            scope.display = chars[current];
        }
    }
}