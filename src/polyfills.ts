

//import 'ie-shim';
import 'es6-shim';
import 'es6-promise';
import 'es7-reflect-metadata';
import 'zone.js/dist/zone-microtask';

if ('production' === ENV) {
  // Production
} else {
  // Development
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
