import React from "react";

import Redirect from "./redirect";

export default function AuthRedirect({ navigate, children }) {
  return (
    <Redirect navigate={navigate} children={children} redirect="/sign-in" />
  );
}
