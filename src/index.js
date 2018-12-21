import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyBD0specOqSpVlYw2XMyNpHe6QSWVujfSQ",
    authDomain: "chatapp-reactredux.firebaseapp.com",
    databaseURL: "https://chatapp-reactredux.firebaseio.com",
    projectId: "chatapp-reactredux",
    storageBucket: "chatapp-reactredux.appspot.com",
    messagingSenderId: "402989882979"
};
firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
