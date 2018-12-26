import React from "react";

import "./checkbox.scss";

export default function Checkbox({
  checked,
  label,
  className = "",
  onClick,
  ...rest
}) {
  return (
    <div className={`Checkbox ${className}`} onClick={onClick}>
      <div className={`Checkbox-square ${checked && "checked"}`} />
      <div className="Checkbox-label">{label}</div>
    </div>
  );
}
