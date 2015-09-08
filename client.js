/// <reference path="typings/tsd.d.ts" />
/// <reference path="node_modules/angular2/bundles/typings/angular2/http.d.ts" />
var angular2_1 = require('angular2/angular2');
var app_cmp_js_1 = require('app/app_cmp.js');
angular2_1.bootstrap(app_cmp_js_1.AppCmp)
    .then(function () { return console.log('client ok'); })
    .catch(function (error) { return console.log("error bootstraping index " + error); });
