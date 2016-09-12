import { browserDynamicPlatform } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

export function main(): Promise<any> {
  return browserDynamicPlatform()
    .bootstrapModule(AppModule)
    .catch((err: any) => console.error(err));
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
