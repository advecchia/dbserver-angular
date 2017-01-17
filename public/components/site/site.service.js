siteApp.service('siteService', function($http) {
    var service = this;
    service.postUser = function (name) {
        return $http({
            method: 'POST', 
            url: 'http://localhost:3000/users',
            headers: {
            	'Content-Type': 'application/json'
            },
            data: {'name':name, 'createdOn': new Date()}
        }).then(function success(response) { 
            return response.data; 
		}, function error(response) {
            return response.status; 
		});
    };

    service.putUser = function (user) {
    	return $http({
            method: 'PUT', 
            url: 'http://localhost:3000/users/' + user.id,
            headers: {
            	'Content-Type': 'application/json'
            },
            data: user
        }).then(function success(response) { 
            return response.data; 
		}, function error(response) {
            return response.status; 
		});
    };
    service.deleteUser = function (id) {
    	return $http({
            method: 'DELETE', 
            url: 'http://localhost:3000/users/' + id
        }).then(function success(response) { 
            return response.data; 
		}, function error(response) {
            return response.status; 
		});
    };
    service.getUsers = function () {
    	return $http({
            method: 'GET', 
            url: 'http://localhost:3000/users'
        }).then(function success(response) { 
            return response.data; 
		}, function error(response) {
            return response.status; 
		});
    };
});