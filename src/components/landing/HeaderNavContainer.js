import React from "react";
import { NavLink } from "react-router-dom";

export const HeaderNavContainer = () => {
  return (
    <nav className="navbar navbar-toggleable-sm bg-info navbar-inverse">
      <div className="container">
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#mainNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav">
            <NavLink
              className="nav-item nav-link"
              exact
              activeClassName="active"
              to="/"
            >
              Home
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNavContainer;
