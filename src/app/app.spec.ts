import {
it,
inject,
injectAsync,
beforeEachProviders,
TestComponentBuilder
} from 'angular2/testing';

// Load the implementations that should be tested
import {Application} from './app';

describe('Application', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [ Application ]);

  it('should have a url', inject([Application], (app) => {
    expect(app.url).toEqual('https://twitter.com/AngularClass');
  }));

});
