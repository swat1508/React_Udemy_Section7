import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//Sec7_Lec83  import App from './App';
              import App from './containers/App'; //Sec7_Lec83 
import * as serviceWorker from './serviceWorker';

//Sec7_Lec86 ReactDOM.render(<App />, document.getElementById('root'));
             ReactDOM.render(<App appTitle="Person Manager" />, document.getElementById('root')); //Sec7_Lec86

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
