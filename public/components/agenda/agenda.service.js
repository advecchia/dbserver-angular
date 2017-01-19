(function() {
	'use strict';
	angular.module('SiteApp').service('agendaService', function($http) {
	    var service = this;
	    service.create = function (appointment) {
	        return $http({
	            method: 'POST', 
	            url: 'http://localhost:3000/appointments',
	            headers: {
	            	'Content-Type': 'application/json'
	            },
	            data: appointment
	        }).then(function success(response) { 
	            return response.data; 
			}, function error(response) {
	            return response.status; 
			});
	    };
	
	    service.update = function (appointment) {
	    	return $http({
	            method: 'PUT', 
	            url: 'http://localhost:3000/appointments/' + appointment.id,
	            headers: {
	            	'Content-Type': 'application/json'
	            },
	            data: appointment
	        }).then(function success(response) { 
	            return response.data; 
			}, function error(response) {
	            return response.status; 
			});
	    };
	    service.remove = function (id) {
	    	return $http({
	            method: 'DELETE', 
	            url: 'http://localhost:3000/appointments/' + id
	        }).then(function success(response) { 
	            return response.data; 
			}, function error(response) {
	            return response.status; 
			});
	    };
	    service.view = function () {
	    	return $http({
	            method: 'GET', 
	            url: 'http://localhost:3000/appointments/'
	        }).then(function success(response) { 
	            return response.data; 
			}, function error(response) {
	            return response.status; 
			});
	    };
	    service.viewDetails = function (id) {
	    	return $http({
	            method: 'GET', 
	            url: 'http://localhost:3000/appointments/' + id
	        }).then(function success(response) { 
	            return response.data; 
			}, function error(response) {
	            return response.status; 
			});
	    };
	    service.count = function () {
	    	return $http({
	            method: 'GET', 
	            url: 'http://localhost:3000/appointments'
	        }).then(function success(response) { 
	            return response.data.length; 
			}, function error(response) {
	            return response.status; 
			});
	    };
	});
})();