import React from "react";
import { Link } from "gatsby";

import logo from "../img/logo.svg";
import "./header.scss";

export default function Header() {
  return (
    <nav className="Header">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </nav>
  );
}
