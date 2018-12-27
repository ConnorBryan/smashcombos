import React from "react";

import "./value.scss";

export default function Value({ label, className = "", children }) {
  return (
    <div className={`Value ${className}`}>
      <div className="Value-label">{label}</div>
      <div className="Value-content">{children}</div>
    </div>
  );
}
