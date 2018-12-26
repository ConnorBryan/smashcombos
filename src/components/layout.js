import React from "react";
import { Link } from "gatsby";
import logo from "../img/logo.svg";

import Header from "./header";
import Footer from "./footer";
import Master from "./master";
import "./layout.scss";

export default function Layout({ basic, children }) {
  return (
    <section className={`Layout ${basic && "basic"}`}>
      <div className="Layout-header">
        <Header />
      </div>
      {!basic && (
        <div className={`Layout-sidebar ${basic && "basic"}`}>
          <Master />
        </div>
      )}
      <div className="Layout-main">{children}</div>
      <div className="Layout-footer">
        <Footer />
      </div>
    </section>
  );
}
