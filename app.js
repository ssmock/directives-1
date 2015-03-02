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

    vm.EditableThing = {
        Items: [1,2,3]
    };

    vm.Emails = [];
    vm.Phones = [];

    vm.EmailRegex = "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}\\b";
    vm.PhoneRegex = "\\b[(]{0,1}[0-9]{3}[)]{0,1}[-\\s\\.]{0,1}[0-9]{3}[-\\s\\.]{0,1}[0-9]{4}\\b";

    MakeEditable(vm.EditableThing, ["Items"]);
    vm.EditableThing.StartEdit();

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