/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

const jsExceptionHandler = (error, isFatal) => {
  console.error('JS Exception capturada por handler global:', error);
  
  if (isFatal) {
    console.error('La excepción JS es fatal. El proceso terminará.');
  }
};

const allowInDevMode = false; 

setJSExceptionHandler(jsExceptionHandler, allowInDevMode);

setNativeExceptionHandler((exceptionString) => {
  console.error('Crash Nativo capturado por handler global:', exceptionString);
}, false);

AppRegistry.registerComponent(appName, () => App);
