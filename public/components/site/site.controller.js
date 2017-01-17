siteApp.controller('SiteController', function($mdDialog, $log, siteService) {
	var controller = this;
	controller.users = [];
	controller.selectedUser = undefined;
	siteService.getUsers().then(function(users) {
		controller.users = users;
		controller.selectedUser = users[3];
	});

	controller.toolbar = {
			'hidden': false,
			'isOpen': false,
			'hover': false
	};
	
	controller.addUser = function($event) {
        // Show the dialog
		$mdDialog.show({
          clickOutsideToClose: true,
          controller: function($mdDialog) {

            // Setup some handlers
            this.close = function() {
            	$mdDialog.cancel();
            };

            this.addUser = function() {
            	siteService.postUser(this.userName)
        		.then(function success(response) {
        			controller.users = response;
        			$log.debug(response);
                	$mdDialog.hide();
        		}, function error(response) {
        			return response.status;
        		});

            };
          },
          controllerAs: 'suc',
          templateUrl: 'components/site/site.user.form.html',
          targetEvent: $event
        });
    };

    /*self.viewCalendar = function($event) {
        // Show the dialog
        $mdDialog.show({
          clickOutsideToClose: true,
          controller: function($mdDialog) {

            // Setup some handlers
            this.close = function() {
            	$mdDialog.cancel();
            };
            this.submit = function() {
            	$mdDialog.hide();
            };
          },
          controllerAs: 'dialog',
          templateUrl: 'dialog.html',
          targetEvent: $event
        });
    };*/
});
