"use strict";

var app = angular.module("app", []);

app.controller("main", main);

function main() {
    var vm = this;

    vm.Left = "here";
    vm.Right = "there";
    vm.Input1 = "";
    vm.Things = [];
    vm.Check1 = {
        Ok: false,
        Bad: false,
        OkIt: okIt,
        BadIt: badIt,
        CancelIt: cancelIt,
        BothIt: bothIt
    };

    for (var i = 0; i < 100; i++) vm.Things.push(i);

    function okIt() {
        vm.Check1.Ok = true;
        vm.Check1.Bad = false;
    }

    function badIt() {
        vm.Check1.Ok = false;
        vm.Check1.Bad = true;
    }

    function cancelIt() {
        vm.Check1.Ok = false;
        vm.Check1.Bad = false;
    }

    function bothIt() {
        vm.Check1.Ok = true;
        vm.Check1.Bad = true;
    }
}