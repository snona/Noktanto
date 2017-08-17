import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import registerServiceWorker from './registerServiceWorker';
import myTheme from './myTheme';
import App from './containers/App';
import './index.css';

const muiTheme = getMuiTheme(myTheme);
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
