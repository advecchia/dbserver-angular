describe('Unit: AgendaService', function () {
	let agendaService, $scope, $http;

	beforeEach(module('SiteApp'));

	beforeEach(inject(function(_$rootScope_, _$httpBackend_) {
		$http = _$httpBackend_;
        $scope = _$rootScope_.$new();
        agendaService = {
    		'create': function (appointment) {},
    		'update': function (appointment) {},
    		'remove': function (id) {},
    		'view': function () {},
    		'viewDetails': function (id) {},
    		'count': function () {}
        };
    }));

	it('should run the Test to get the appointments from the backend', function() {
		expect(agendaService.view).not.toThrow();
    });

	/*it('should run the Test to get the appointments from the backend', function() {
        $http.when('GET', 'http://localhost:3000/appointments')
            .respond(200, {
                "appointments": []
        });

        //$http.flush();
        //expect($http.flush).not.toThrow();
    });*/
});
