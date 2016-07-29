import {Application} from './app/app';
import {APP_PROVIDERS} from './app/providers';
import {APP_DIRECTIVES} from './app/directives';
import * as browser from '@angular/platform-browser';
import * as browserDynamic from '@angular/platform-browser-dynamic';
import * as ngCore from '@angular/core';
import {APP_ROUTER_PROVIDERS} from './app/routes';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import {MODAL_BROWSER_PROVIDERS} from 'angular2-modal/platform-browser';
import {disableDeprecatedForms, provideForms, FORM_PROVIDERS} from '@angular/forms';


const APPLICATION_PROVIDERS = [
    ...HTTP_PROVIDERS,
    ...APP_ROUTER_PROVIDERS,
    ...FORM_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    ...APP_PROVIDERS,
    ...MODAL_BROWSER_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
];

const APPLICATION_DIRECTIVES = [
    ...ROUTER_DIRECTIVES,
    ...APP_DIRECTIVES
];

const APPLICATION_PIPES = [];

export function main() {
    return browserDynamic.bootstrap(Application, [
        ...APPLICATION_PROVIDERS,
        {provide: ngCore.PLATFORM_DIRECTIVES, useValue: APPLICATION_DIRECTIVES, multi: true},
        {provide: ngCore.PLATFORM_PIPES, useValue: APPLICATION_PIPES, multi: true}
    ]).catch((err: any) => console.error(err));
}

function bootstrapDomReady() {
    // bootstrap after document is ready
    return document.addEventListener('DOMContentLoaded', main);
}

if ('development' === ENV) {
    // activate hot module reload
    if (HMR) {
        if (document.readyState === 'complete') {
            main();
        } else {
            bootstrapDomReady();
        }
        module.hot.accept();
    } else {
        bootstrapDomReady();
    }
} else {
    bootstrapDomReady();
}
