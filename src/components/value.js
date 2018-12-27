import React from "react";

import "./value.scss";

export default function Value({ label, vertical, className = "", children }) {
  return (
    <div className={`Value ${className} ${vertical && "vertical"}`}>
      <div className="Value-label">{label}</div>
      <div className="Value-content">{children}</div>
    </div>
  );
}
