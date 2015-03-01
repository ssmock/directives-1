/**
 * Provides content overlaying a simple text input; useful for providing 
 * instructions and verification text, especially in the absence the 
 * placeholder attribute.
 * 
 * To style properly, place inside of a div.d-textover-box.  Margin and padding
 * values are set to work with Bootstrap's form-control classes.
 * 
 * Example:
 * 
 * <div class="d-textover-box">
 *     <input type="text" id="thing" class="form-control"
 *             ng-model="main.Input1" />
 *     <d-textover left hide-with-input>
 *         LEFT: 
 *         <span ng-bind="main.Left"></span>
 *     </d-textover>
 *     <d-textover right>
 *         RIGHT: 
 *         <span ng-bind="main.Right"></span>
 *         <d-spinner show="true"></d-spinner>
 *     </d-textover>
 * </div>
 */
"use strict";

angular.module("app").directive("dTextover", dTextover);

dTextover.$inject = ["$timeout"];

function dTextover($timeout) {
    var directive = {
        restrict: "E",
        template: "<div ng-show='shown' ng-class='class'><ng-transclude></ng-transclude></div>",
        transclude: true,
        scope: true,
        link: link
    };

    return directive;

    function link(scope, element, attributes) {
        var input = element.parent().find("input");

        scope.class =
            attributes.hasOwnProperty("right")
            ? "d-over-right"
            : "d-over-left";

        scope.shown = true;

        if (attributes.hasOwnProperty("hideWithInput")) {
            input.on("keydown paste input", updateShow);

            $timeout(updateShow, 0);
        }
        
        function updateShow() {
            if (input.val()) {
                scope.shown = false;
            }
            else {
                scope.shown = true;
            }

            scope.$apply();
        }
    }
}