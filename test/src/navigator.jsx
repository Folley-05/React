import React from 'react'
import {Link}from 'react-router-dom'

export default function Navigation() {

    return  <ul style={{display: 'flex'}}>
                <Link to="/Accueil" style={{listStyle: 'none', margin: '2%'}}>
                    <li >Accueil</li>
                </Link>
                <Link to="/Contacts"  style={{listStyle: 'none', margin: '2%'}}>
                    <li>Contacts</li>
                </Link>
                <Link to="/Projects"  style={{listStyle: 'none', margin: '2%'}}>
                    <li>Projets</li>
                </Link>
            </ul>
}