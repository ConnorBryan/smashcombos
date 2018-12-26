import React from "react";

import logo from "../img/logo2.svg";
import "./footer.scss";

export default function Footer() {
  return (
    <section className="Footer">
      <p>
        <img src={logo} alt="Logo" />
        <br />© 2019 SmashCombos. All rights reserved.
      </p>
    </section>
  );
}
