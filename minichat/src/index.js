import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import {Modal} from 'react-bootstrap'
import App from './App';

if(localStorage['nom']) {
  console.log(localStorage['nom'])
  var name=localStorage['nom']
}

function GetName() {

    const [state, setState]=useState(true)
    let inputName=useRef(null)
    const register=()=>{
        setState(false)
        localStorage.setItem('nom', inputName.current.value)
        console.log(inputName.current.value)
    }
  return  <Modal show={state}>
            <Modal.Header> <h3>entrez votre nom d'utilisateur</h3> </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <input ref={inputName} type="text" className="form-control" placeholder="votre nom d'utilisateur" />
                </div>
            </Modal.Body>
            <Modal.Footer> <button className="btn btn-success" onClick={register} >enregistrer</button> </Modal.Footer>
          </Modal>
}


ReactDOM.render(
  <React.StrictMode>
    {localStorage['nom'] ? "" : <GetName />}
    <App nom={name}/>
  </React.StrictMode>,
  document.getElementById('root')
);


