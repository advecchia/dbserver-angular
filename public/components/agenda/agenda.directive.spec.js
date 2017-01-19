describe('Unit: AgendaDirective', function () {
	let agendaController, $scope, $mdDialog, agendaService, template;

	beforeEach(module('SiteApp'));
	
	// load the html templates
	beforeEach(module('public/components/agenda/agenda.html', 
			'public/components/agenda/agenda.create.form.html',
			'public/components/agenda/agenda.update.form.html',
			'public/components/agenda/agenda.remove.form.html'));

	describe('Unit: AgendaController', function () {
	    beforeEach(inject(function (_$controller_, _$compile_, _$rootScope_, _$mdDialog_, _agendaService_) {
	    	$scope = _$rootScope_.$new();
	    	$mdDialog = _$mdDialog_;
	    	agendaService = _agendaService_;
	    	var element = angular.element("<agenda></agenda>");
	    	template = _$compile_(element)($scope);
	    	$scope.$digest();
	    	agendaController = element.controller;
	    	agendaService = {
	        		'create': function (appointment) {},
	        		'update': function (appointment) {},
	        		'remove': function (id) {},
	        		'view': function () {},
	        		'viewDetails': function (id) {},
	        		'count': function () {}
            };
	    }));
	
	    it('validates controller initialization', function () {
	    	expect(agendaController).not.toBeNull();
	    });

	    it('validates appointment initialization', function () {
	    	expect(agendaController.appointments).not.toBeNull();
	    });
	    
	    it('verifies the use of directive data in scope', function () {
	    	var data = template.find('agenda-data');
	    	$scope.$digest();
	    	expect(data).not.toEqual(null);
	    });
	});
});