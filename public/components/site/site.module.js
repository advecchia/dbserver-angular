'use strict';
var siteApp = angular.module('SiteApp', ['ngAnimate', 'ngAria', 'ngMaterial'])
	.config(function($compileProvider) {
		//http://stackoverflow.com/questions/41170639/angular-material-date-picker-with-blank-calendar
		// This configuration deals with a bug of datepicker component with angular 1.6
		$compileProvider.preAssignBindingsEnabled(true);
});