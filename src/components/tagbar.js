import React from "react";

import "./tagbar.scss";

export default function Tagbar({ className = "", children }) {
  return (
    <div className={`Tagbar ${className}`}>
      <div className="Tagbar-label">Tags</div>
      <div className="Tagbar-tags">{children}</div>
    </div>
  );
}
