import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
if(localStorage['nom']) {
  console.log(localStorage['nom'])
}
else {
  let name=prompt("entrez un nom d'utilisateur")
  while(!name){
    name=prompt("entrez un nom d'utilisateur pour pouvoir utiliser l'application")
  }
  localStorage.setItem('nom', name)
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


