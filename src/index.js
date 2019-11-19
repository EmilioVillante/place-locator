import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Firebase from './integrations/firebase';
import App from './containers';
import FirebaseContext from './integrations/firebase/FirebaseContext';

// Instantiate firebase
const firebase = new Firebase();

ReactDOM.render(
    <FirebaseContext.Provider value={firebase}>
        <App/>
    </FirebaseContext.Provider>
    , document.getElementById('root'));
