/**
 * Flag-based Bootstrap glyphicon display for several attribute-specified 
 * states:
 * 
 *   OK: Shows a green checkmark
 *   Bad: Shows a red exclamation
 *   Neither: Blank
 *   Both: Some combination of the above; wily; avoid this.
 * 
 * Example:
 * 
 *   <d-check-glyph is-ok="main.Check1.Ok" is-bad="main.Check1.Bad" />
 */
"use strict";

angular.module("app").directive("dCheckGlyph", dCheckGlyph);

function dCheckGlyph() {
    var OK_CLASS = "glyphicon-ok";
    var OK_COLOR = "#0d0";

    var BAD_CLASS = "glyphicon-exclamation-sign";
    var BAD_COLOR = "#d00";

    var scope = {
        IsOk: "=isOk",
        IsBad: "=isBad"
    }

    var directive = {
        restrict: "E",
        scope: scope,
        link: link,
        template: "<span class='glyphicon' ng-class='icon'></span>"
    };

    return directive;

    function link(scope, element) {
        scope.icon = {
            OK_CLASS: scope.IsOk,
            BAD_CLASS: scope.IsBad
        };

        scope.$watch("IsOk", function (val) {
            scope.icon[OK_CLASS] = val;

            if (val) setColor(OK_COLOR);
        });

        scope.$watch("IsBad", function (val) {
            scope.icon[BAD_CLASS] = val;

            if (val) setColor(BAD_COLOR);
        });

        function setColor(color) {
            element[0].style.color = color;
        }
    }
}