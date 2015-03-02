/**
 * Provides a way to edit a simple list of strings, accessed via ngModel, which 
 * can be required to confirm to an attribute-specifed, and which can be 
 * required to be unique.  By default, any invalid entry results in a bad list,
 * but this can be overridden via the cull-invalids flag attribute.
 * 
 * Useful for entry of very simple lists, like phone numbers or email 
 * addresses.
 * 
 * Example:
 *   <d-string-list ng-model="main.EditableThing.Ed.Items"
 *                  unique valid-pattern="a"></d-string-list>
 * 
 * Note that if an array of items that are not strings is specified as the 
 * model, each item will be converted to a string as part of the binding 
 * process.
 */
angular.module("app").directive("dStringList", dStringList);

dStringList.$inject = ["$timeout"];

function dStringList($timeout) {
    var scope = {
        ngModel: "&",
        validPattern: "@"
    };

    var directive = {
        scope: scope,
        restrict: "E",
        templateUrl: "directives/d-string-list/d-string-list.view.html",
        require: "ngModel",
        link: link
    };

    return directive;

    function link(scope, element, attributes, ngModel) {
        var vm = {};

        vm.List = [];
        vm.Add = add;
        vm.RemoveAt = removeAt;
        vm.Sync = sync;

        var pattern =
            scope.validPattern ? new RegExp(scope.validPattern) : null;
        var unique = attributes.hasOwnProperty("unique");
        var cullInvalids = attributes.hasOwnProperty("cullInvalids");

        // ngModel implementation requirement
        ngModel.$render = render;

        scope.vm = vm;

        var invalidators = [];

        if (pattern) invalidators.push(doesNotMatchPattern);
        if (unique) invalidators.push(isNotUnique);

        function sync() {
            var allValid = validateAll();
            var value = null;

            if (allValid) {
                value = _.pluck(vm.List, "Value");
            }
            else if(cullInvalids) {
                value = _.chain(vm.List)
                    .where({ IsInvalid: false })
                    .pluck(vm.List, "Value")
                    .value();
            }

            ngModel.$setViewValue(value);
        }

        function render() {
            vm.List = [];

            _.each(ngModel.$viewValue, function (it) {
                vm.List.push({
                    Value: it.toString(),
                    IsInvalid: false
                });
            });

            if (vm.List.length === 0) addNew();

            validateAll();
        }

        function add() {
            addNew();
            sync();

            $timeout(focusOnAdd, 0);
        }

        function removeAt(index) {
            vm.List.splice(index, 1);

            sync();
        }

        function addNew() {
            vm.List.push({
                Value: "",
                IsInvalid: isInvalid("")
            });
        }

        function validateAll() {
            var areValid =
                _.map(vm.List, function (it, index) {
                    it.IsInvalid = isInvalid(it.Value, index);

                    return it.IsInvalid;
                });

            return !_.any(areValid);
        }

        function isInvalid(value, index) {
            return _.any(invalidators, function (invalidator) {
                return invalidator(value, index);
            });
        }

        function isNotUnique(value, index) {
            return _.any(vm.List, function (other, otherIndex) {
                return index !== otherIndex
                  && value.trim() === other.Value.trim();
            });
        }

        function doesNotMatchPattern(itsValue, itsIndex) {
            return !itsValue.trim().match(pattern);
        }

        function focusOnAdd() {
            var inputs = element.find("input");

            inputs[inputs.length - 1].focus();
        }
    }
}