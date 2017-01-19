(function() {
	'use strict';
	function AgendaController($scope, $mdDialog, agendaService) {
		let months = [
	          {'acronym':'Jan', 'description':'Janeiro', 'days':31},
			  {'acronym':'Fev', 'description':'Fevereiro', 'days':28},
			  {'acronym':'Mar', 'description':'Março', 'days':31},
			  {'acronym':'Abr', 'description':'Abril', 'days':30},
			  {'acronym':'Mai', 'description':'Maio', 'days':31},
			  {'acronym':'Jun', 'description':'Junho', 'days':30},
			  {'acronym':'jul', 'description':'Julho', 'days':31},
			  {'acronym':'Ago', 'description':'Agosto', 'days':31},
			  {'acronym':'Set', 'description':'Setembro', 'days':30},
			  {'acronym':'Out', 'description':'Outubro', 'days':31},
			  {'acronym':'Nov', 'description':'Novembro', 'days':30},
			  {'acronym':'Dez', 'description':'Dezembro', 'days':31}
		  ];
		let weekDays = [
              {'acronym':'Dom', 'description':'Domingo'},
              {'acronym':'Seg', 'description':'Segunda'},
              {'acronym':'Ter', 'description':'Terça'},
              {'acronym':'Qua', 'description':'Quarta'},
              {'acronym':'Qui', 'description':'Quinta'},
              {'acronym':'Sex', 'description':'Sexta'},
              {'acronym':'Sab', 'description':'Sábado'}
          ];
	
		var controller = this;
		controller.appointments = [];
		controller.show = [];
		controller.days = {};
		init();
	
		// Make group of appointments based on date
		controller.addDay = function addDay(appointment) {
			const parsedDate = new Date(parseInt(appointment.begin));
			const year = parsedDate.getFullYear();
			const month = controller.getMonth(parsedDate.getMonth());
			const weekDay = controller.getWeekDay(parsedDate.getDay());
			const day = parsedDate.getDate();
			
			const label = weekDay.description + ', ' + day + ' de ' + month.description + ' de ' + year;
	
			const timeKey = parseInt(new Date(year, parsedDate.getMonth(), day).getTime()).toString();
			if (!controller.days.hasOwnProperty(timeKey)) {
				controller.days[timeKey] = {'label': label, 'appointments': []};
			}
			controller.days[timeKey]['appointments'].push(appointment);
		};
	
		// Control visibility of appointment details
		controller.viewDetails = function viewDetails(id) {
			controller.show[id] = !controller.show[id];
		}
	
		// Future events in calendar 
		controller.pendingCount = function pendingCount() {
			const currentDate = new Date();
			const futureAppointments = controller.appointments.filter(function(appointment) {
				return appointment.begin >= currentDate.getTime();
			})
			return futureAppointments.length;
		};
	
		// Calendar date parse
		controller.getWeekDay = function(dayIndex) {
			return weekDays[dayIndex];
		};
		controller.getMonth = function(monthIndex) {
			return months[monthIndex];
		};
	
		// Dialog functions
		controller.createAppointment = function($event) {
	        // Show the dialog
			$mdDialog.show({
	            clickOutsideToClose: true,
	            controller: function ($mdDialog) {
	                // Setup some handlers
	            	this.close = function() {
	            		$mdDialog.cancel();
	            	};
	
	            	this.dateBegin = new Date();
	            	this.dateEnd = new Date();
	            	const newDate = new Date();
	            	this.timeBegin = new Date(
	        			newDate.getFullYear(),
	        			newDate.getMonth(),
	        			newDate.getDate(),
	        			newDate.getHours(),
	        			newDate.getMinutes()
	        		);
	            	this.timeEnd = new Date(
	        			newDate.getFullYear(),
	        			newDate.getMonth(),
	        			newDate.getDate(),
	        			newDate.getHours(),
	        			newDate.getMinutes()
	        		);
	
	            	this.addAppointment = function() {
	            		var begin = new Date(
	            			this.dateBegin.getFullYear(),
	            			this.dateBegin.getMonth(),
	            			this.dateBegin.getDate(),
	            			this.timeBegin.getHours(),
	            			this.timeBegin.getMinutes()
	            		).getTime();
	            		var end = new Date(
	            			this.dateEnd.getFullYear(),
	            			this.dateEnd.getMonth(),
	            			this.dateEnd.getDate(),
	            			this.timeEnd.getHours(),
	            			this.timeEnd.getMinutes()
	            		).getTime();
		            	const appointment = {
		            		'title': this.title,
		            		'begin': begin,
		            		'end': end,
		            		'details': this.details,
		            		'changedOn': new Date().getTime()
		            	};
		              	agendaService.create(appointment)
		          		.then(function success(response) {
		                  	$mdDialog.hide();
		                  	init();
		          		}, function error(response) {
		          			return response.status;
		          		});
	            	};
	      	  	},
	      	  	controllerAs: 'cac',
	      	  	templateUrl: 'components/agenda/agenda.create.form.html',
	      	  	targetEvent: $event
	    	});
		};
	
		controller.updateAppointment = function($event, currentAppointment) {
			// Show the dialog
			$mdDialog.show({
	            clickOutsideToClose: true,
	            controller: function ($mdDialog) {
	                // Setup some handlers
	            	this.close = function() {
	            		$mdDialog.cancel();
	            	};
	            	this.dateBegin = new Date(parseInt(currentAppointment.begin));
	            	this.dateEnd = new Date(parseInt(currentAppointment.end));
	            	this.timeBegin = this.dateBegin;
	            	this.timeEnd = this.dateEnd;
	            	this.title = currentAppointment.title;
	            	this.details = currentAppointment.details;
	            	this.id = currentAppointment.id;
	
	            	this.updateAppointment = function() {
	            		var begin = new Date(
	            			this.dateBegin.getFullYear(),
	            			this.dateBegin.getMonth(),
	            			this.dateBegin.getDate(),
	            			this.timeBegin.getHours(),
	            			this.timeBegin.getMinutes()
	            		).getTime();
	            		var end = new Date(
	            			this.dateEnd.getFullYear(),
	            			this.dateEnd.getMonth(),
	            			this.dateEnd.getDate(),
	            			this.timeEnd.getHours(),
	            			this.timeEnd.getMinutes()
	            		).getTime();
		            	const appointment = {
	            			'id': this.id,
	            			'title': this.title,
		            		'begin': begin,
		            		'end': end,
		            		'details': this.details,
		            		'changedOn': new Date().getTime()
		            	};
	
		              	agendaService.update(appointment)
		          		.then(function success(response) {
		                  	$mdDialog.hide();
		                  	init();
		          		}, function error(response) {
		          			return response.status;
		          		});
	            	};
	      	  	},
	      	  	controllerAs: 'uac',
	      	  	templateUrl: 'components/agenda/agenda.update.form.html',
	      	  	targetEvent: $event
	    	});
		};
	
		controller.removeAppointment = function($event, appointmentId) {
			// Show the dialog
			$mdDialog.show({
	            clickOutsideToClose: true,
	            controller: function ($mdDialog) {
	                // Setup some handlers
	            	this.close = function() {
	            		$mdDialog.cancel();
	            	};
	
	            	this.removeAppointment = function() {
		              	agendaService.remove(appointmentId)
		          		.then(function success(response) {
		                  	$mdDialog.hide();
		                  	init();
		          		}, function error(response) {
		          			return response.status;
		          		});
	            	};
	      	  	},
	      	  	controllerAs: 'rac',
	      	  	templateUrl: 'components/agenda/agenda.remove.form.html',
	      	  	targetEvent: $event
	    	});
		};
	
		// Show the list of appointments
		function init() {
			agendaService.view().then(function (response) {
				controller.days = {};
				// Order by begin date
				controller.appointments = response.sort(function (a, b) {
					return a.begin - b.begin;
				});
				controller.appointments.forEach(function (appointment) {
					controller.addDay(appointment);
					controller.show[appointment.id] = false;
				});
			});
		};
	}
	
	angular.module('SiteApp').directive('agenda', function() {
	    return {
	        restrict: 'E',
	        scope: {
	            agendaData: '='
	        },
	        controllerAs: 'ac',
	        controller: AgendaController,
	        templateUrl: 'components/agenda/agenda.html',
	        link: function(scope, element, attrs) {	// Parse data from directive to json format
	            if (attrs.agendaData) {
	            	scope.agendaData = JSON.parse(attrs.agendaData);
	            }
	        }
	    };
	});
})();