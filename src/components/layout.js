import React from "react";

import Header from "./header";
import Master from "./master";
import Footer from "./footer";
import "./layout.scss";

export default function Layout({ basic, children }) {
  return (
    <section className="Layout">
      <div className="Layout-head">
        <Header />
      </div>
      <div className="Layout-content">
        {!basic && (
          <div className="Layout-content-side">
            <Master />
          </div>
        )}
        <div className="Layout-content-main">{children}</div>
      </div>
      <div className="Layout-foot">
        <Footer />
      </div>
    </section>
  );
}
