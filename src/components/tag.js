import React from "react";

import "./tag.scss";

export default function Tag({ children, className = "", ...rest }) {
  return <span className={`Tag ${className}`}>{children}</span>;
}
