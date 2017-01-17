const months = [
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
const weekDays = [
    {'acronym':'Dom', 'description':'Domingo'},
    {'acronym':'Seg', 'description':'Segunda'},
    {'acronym':'Ter', 'description':'Terça'},
    {'acronym':'Qua', 'description':'Quarta'},
    {'acronym':'Qui', 'description':'Quinta'},
    {'acronym':'Sex', 'description':'Sexta'},
    {'acronym':'Sab', 'description':'Sábado'}
];

function AgendaController($scope, agendaService) {
	var controller = this;
	controller.out = null;
	controller.weekDays = weekDays;
	
	controller.agendaCreate = function create() {
		agendaService.create().then(function (response) {
			controller.out = response;
		});
	};

	controller.agendaUpdate = function update() {
		agendaService.update().then(function (response) {
			controller.out = response;
		});
	};

	controller.agendaRemove = function remove() {
		agendaService.remove().then(function (response) {
			controller.out = response;
		});
	};

	controller.agendaView = function view() {
		agendaService.view().then(function (response) {
			controller.out = response;
		});
	};

	controller.agendaViewDetails = function viewDetails() {
		agendaService.viewDetails().then(function (response) {
			controller.out = response;
		});
	};

	controller.agendaCount = function count() {
		agendaService.count().then(function (response) {
			controller.out = response;
		});
	};

	// Calendar
	controller.getDay = function(dayIndex) {
		return weekDays[dayIndex];
	};
	controller.getMonth = function(monthIndex) {
		return months[monthIndex];
	};
	controller.getMonthDays = function(monthIndex) {
		var days = controller.getMonth(monthIndex).days;
		if (monthIndex === 1) { // February can have one day more
			const year = controller.calendarCurrentYear;
			if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
				days += 1;
			}
		}
		return days;
	};

	controller.previousMonth = function() {
		if (controller.calendarCurrentMonth === 0) {
			controller.calendarCurrentMonth = 11; // last month
			controller.calendarCurrentYear -= 1;
		} else {
			controller.calendarCurrentMonth -= 1;
		}
		controller.calendarCurrentMonthDays = controller.getMonthDays(controller.calendarCurrentMonth);
	};
	controller.nextMonth = function() {
		if (controller.calendarCurrentMonth === 11) {
			controller.calendarCurrentMonth = 0; // first month
			controller.calendarCurrentYear += 1;
		} else {
			controller.calendarCurrentMonth += 1;
		}
		controller.calendarCurrentMonthDays = controller.getMonthDays(controller.calendarCurrentMonth);
	};

	controller.showCurrentCalendarMonth = function() {
		return controller.getMonth(controller.calendarCurrentMonth).description.toUpperCase();
	};

	controller.showCurrentCalendarYear = function() {
		return controller.calendarCurrentYear;
	};

	controller.showCurrentCalendarMonthDays = function() {
		return controller.calendarCurrentMonthDays;
	};

	controller.getCurrentCalendarMonthWeekDays = function() {
		var firstMonthDayWeek = new Date(controller.calendarCurrentYear, 
				controller.calendarCurrentMonth, 1).getDay(); // Get the initial week day for the first day of month
		var weekDays = [];
		var week = new Array(7).fill('');
		for (var day = 1; day <= controller.calendarCurrentMonthDays; day++) {
			week[firstMonthDayWeek] = day;
			if (firstMonthDayWeek === 6) { // Last week day
				weekDays.push(week);
				week = new Array(7).fill('');
				firstMonthDayWeek = 0;
			} else {
				firstMonthDayWeek += 1;
			}
		}
		var lastWeek = weekDays[weekDays.length - 1];
		if (lastWeek.indexOf(controller.calendarCurrentMonthDays) === -1) { // Guarantee that all day weeks are filled correctly 
			weekDays.push(week);
		}

		return weekDays;
	};

	controller.currentDate = new Date();
	controller.calendarCurrentMonth = controller.currentDate.getMonth(); // The date that will be modified during the user session
	controller.calendarCurrentYear = controller.currentDate.getFullYear();
	controller.calendarCurrentMonthDays = controller.getMonthDays(controller.calendarCurrentMonth);
	

}

siteApp.directive('agenda', function() {
    return {
        restrict: 'E',
        scope: {
            agendaData: '=',
            agendaCreate: '&',
            agendaUpdate: '&',
            agendaRemove: '&',
            agendaView: '&',
            agendaViewDetails: '&',
            agendaCount: '&',
            showCurrentCalendarMonth: '&',
            showCurrentCalendarYear: '&',
            getCurrentCalendarMonthWeekDays: '&',
            previousMonth: '&',
            nextMonth: '&'
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
