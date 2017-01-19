describe('Unit: App', function () {
    beforeEach(module('SiteApp'));

    describe('Site app module', function () {
        var $compileProvider;

        beforeEach(inject(function (_$compile_) {
        	$compileProvider = _$compile_;
        }));

        it('verifies state configuration for compile provider', function () {
        	expect($compileProvider).not.toBeNull();
        });
    });
});
