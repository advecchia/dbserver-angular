describe('Unit: SiteController', function () {
	var siteController;

	beforeEach(module('SiteApp'));

    beforeEach(inject(function (_$controller_) {
    	siteController = _$controller_('SiteController', {});
    }));

    it('validates controller initialization', function () {
        expect(siteController).not.toBeNull();
    });
});