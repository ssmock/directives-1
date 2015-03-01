var app = angular.module("app", []);

app.controller("main", main);

function main() {
    var vm = this;

    this.Left = "here";
    this.Right = "there";
    this.Input1 = "";
    this.Things = [];

    for (var i = 0; i < 100; i++) this.Things.push(i);
}