describe('App', () => {

    beforeEach(() => browser.get('/'));

    it('should have a title', () => {
        expect(browser.getTitle()).toEqual('smle');
    });

    it('should have <header>', () => {
        expect(element(by.css('app header')).isPresent()).toEqual(true);
    });

    it('should have <main>', () => {
        let subject = element(by.css('app main')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });

    it('should have <footer>', () => {
        let subject = element(by.css('app footer')).getText();
        let result = 'WebPack Angular 2 Starter by @AngularClass';
        expect(subject).toEqual(result);
    });

});
