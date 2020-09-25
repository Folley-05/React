import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navigateur from './navigator'
import Contact from './contact'
import Accueil from './accueil'
import Projets from './projets';


export default function App() {


  return  <div className="">
              <Router>
                <Navigateur />
                <Route path="/Accueil" exac component={Accueil} />
                <Route path='/Projects' exac component={Projets} />
                <Route path='/Contacts' exac component={Contact} />
              </Router>
          </div>
}