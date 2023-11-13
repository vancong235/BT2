/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './src/App'
import {name as appName} from './app.json';
import HomeNote from './src/AllNote';


AppRegistry.registerComponent(appName, () => App);
