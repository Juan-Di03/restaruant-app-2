import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiNoodles } from 'react-icons/gi';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-granate shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <GiNoodles size={26} className="me-2 text-warning" />
          <span>Directorio de restaurantes</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search" className="nav-link">
                Buscar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/new-restaurant" className="nav-link">
                Agregar Restaurante
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;