import {
  it,
  inject,
  beforeEachProviders,
} from '@angular/core/testing';

// Load the implementations that should be tested
import {Application} from './app';

describe('Application', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [Application]);

  it('should have a url', inject([Application], (app: Application) => {
    expect(app).not.toBeNull();
  }));

});
