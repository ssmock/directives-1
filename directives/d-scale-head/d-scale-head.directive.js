/**
 * Wraps transcluded content in a top-fixed header element that bears one of 
 * two classes reflecting the window's current scroll position, relative to an
 * attribute-specified heightPx value.
 *   
 *   d-scale-head-above - the position is above the value (top of the page)
 *   d-scale-head-below - the position is below the value (a little ways down)
 * 
 * It also adds top padding to the document's body equal to that number.
 * 
 * Additional notes:
 *   - Be sure to specify heightPx as a number (e.g. 100) rather than a style 
 *     value (e.g. 100px).
 *   - Aside from the body and the basic styling of its own header, this 
 *     directive doesn't do any style; you have to add that yourself.
 * 
 * Example HTML:
 *   <d-scale-head height-px="100">
 *       <div class="row">
 *           <div class="col-sm-4">Stuff on the left</div>
 *           <div class="scale-me col-sm-4 text-center">
 *               ASD
 *               <img class="scale-me" width="90" src="http://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Penrose-dreieck.svg/2000px-Penrose-dreieck.svg.png" />
 *               FAS
 *           </div>
 *           <div class="col-sm-4 text-right">Stuff on the right</div>
 *       </div>
 *   </d-scale-head>
 * 
 * CSS:
 *   .d-scale-head-above {
 *       height: 100px;
 *       transition: height 0.25s;
 *       -webkit-transition: height 0.25s;
 *       -moz-transition: height 0.25s;
 *       -ms-transition: height 0.25s;
 *       -o-transition: height 0.25s;
 *   }
 *   
 *   .d-scale-head-below {
 *       height: 50px;
 *       transition: height 0.25s;
 *       -webkit-transition: height 0.25s;
 *       -moz-transition: height 0.25s;
 *       -ms-transition: height 0.25s;
 *       -o-transition: height 0.25s;
 *   }
 */
"use strict";

angular.module("app").directive("dScaleHead", dScaleHead);

dScaleHead.$inject = ["$window"];

function dScaleHead($window) {
    var directive = {
        restrict: "E",
        template: "<header ng-class='headerClass' ng-style='style'><ng-transclude></ng-transclude></header>",
        scope: true,
        transclude: true,
        link: link
    };

    return directive;

    function link(scope, element, attributes) {
        var ABOVE_CLASS = "d-scale-head-above";
        var BELOW_CLASS = "d-scale-head-below";

        var height = 100;

        if (attributes.hasOwnProperty("heightPx"))
            height = attributes.heightPx;

        var styleHeight = height + "px";

        scope.style = {
            position: "fixed",
            top: "0",
            right: "0",
            left: "0",
            zIndex: "20"
        };

        scope.headerClass = ABOVE_CLASS;

        angular.element($window).bind("scroll", _.throttle(onScroll, 200));

        addBodyPadding();

        function onScroll(event) {
            var scrollPosition =
                $window.pageYOffset
                || $window.document.documentElement.scrollTop;

            console.log(scrollPosition, height, scrollPosition > height)

            if (scrollPosition > height) makeSmall();
            else makeLarge();
        }

        function makeSmall() {
            console.log("MAKE SMALL");
            scope.headerClass = BELOW_CLASS;
        }

        function makeLarge() {
            console.log("MAKE LARGE");
            scope.headerClass = ABOVE_CLASS;

        }

        function addBodyPadding() {
            $window.document.body.style.paddingTop = styleHeight;
        }

        function removeBodyPadding() {
            delete $window.document.body.style.paddingTop;
        }
    }
}