import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

export default function Navbar(props) {
  const history = useHistory();

  return (
    <nav className="navbar navbar-expand-md bg-light navbar-light">

      <Link className="navbar-brand" to="/">SuperPet</Link>


      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>


      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/pets">Pets</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
              <FaCog />
            </a>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/config/animais">Animais</Link>
              <Link className="dropdown-item" to="/config/pessoas">Pessoas</Link>
              <Link className="dropdown-item" to="/config/tipos-de-evento">Tipos de Evento</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
