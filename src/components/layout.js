import React from "react";

import Header from "./header";
import Footer from "./footer";
import "./layout.scss";

export default function Layout({ children }) {
  return (
    <section className="Layout">
      <div className="Layout-head">
        <Header />
      </div>
      <div className="Layout-content">{children}</div>
      <div className="Layout-foot">
        <Footer />
      </div>
    </section>
  );
}
