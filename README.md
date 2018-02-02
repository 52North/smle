# smle<sub>/ˈsmaɪli/</sub> — The Friendly SensorML Editor ☺

## Description

**Editing SensorML documents**>

*smle is a SensorML editor which enables browser-based editing of SensorML descriptions.*

The editor provides a user-friendly way to edit complex SensorML descriptions in a web application which runs in the browser. It is based on different input types and UI components.

Features:
 * access to configured SOS instances
 * to insert new SensorML documents
 * edit or update registered SensorML documents
 * remove SensorML documents
 * SensorML documents can be uploaded for editing
 * edited SensorML documents can be downloaded

The following main frameworks are used to provide this application:

-	[Angular 2](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
-	[Bootstrap](https://getbootstrap.com/)
-	[Leaflet](https://leafletjs.com/)

## Demo

The latest demo version of smle is available [here](http://52north.github.io/smle/master/) via GitHub pages.

  <div style="float:left">
    <img src="https://cloud.githubusercontent.com/assets/3830314/21933955/d7e9d6d0-d9a7-11e6-9fc8-96e78e500b44.png" width="50%"/>
  </div>
  <div style="float:left">
    <img src="https://cloud.githubusercontent.com/assets/3830314/21933958/d930e164-d9a7-11e6-8327-5bfadd4646d0.png" width="50%"/>
  </div>

## Quick Start

1.	`git clone` this repository
2.	run `npm install` to get all dependencies
3.	run `npm start` to start application in the development mode. The application will be bundled via Webpack and the web server will start on `localhost:4200`

## Usage

### Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Documentation

A tutorial based documentation of the SensorML Editor can be accessed on the [documentation page](documentation/SMLE_Manual.md)

## Credits

The development of the 52°North **smle** implementation was supported by several organizations and projects. Among other we would like to thank the following organisations and project

| Project/Logo | Description |
| :-------------: | :------------- |
| <a target="_blank" href="http://www.nexosproject.eu/"><img alt="NeXOS - Next generation, Cost-effective, Compact, Multifunctional Web Enabled Ocean Sensor Systems Empowering Marine, Maritime and Fisheries Management" align="middle" width="172" src="https://raw.githubusercontent.com/52North/sos/develop/spring/views/src/main/webapp/static/images/funding/logo_nexos.png" /></a> | The development of this version of 52&deg;North smle was supported by the <a target="_blank" href="http://cordis.europa.eu/fp7/home_en.html">European FP7</a> research project <a target="_blank" href="http://www.nexosproject.eu/">NeXOS</a> (co-funded by the European Commission under the grant agreement n&deg;614102) |
| <a target="_blank" href="http://www.fixo3.eu/"><img alt="FixO3 - Fixed-Point Open Ocean Observatories" align="middle" width="172" src="https://raw.githubusercontent.com/52North/sos/develop/spring/views/src/main/webapp/static/images/funding/logo_fixo3.png" /></a> | The development of this version of 52&deg;North smle was supported by the <a target="_blank" href="http://cordis.europa.eu/fp7/home_en.html">European FP7</a> research project <a target="_blank" href="http://www.fixo3.eu/">FixO3</a> (co-funded by the European Commission under the grant agreement n&deg;312463) |
