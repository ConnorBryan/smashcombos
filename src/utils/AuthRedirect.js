import React from "react";

import CustomRedirect from "./CustomRedirect";

export default function AuthRedirect({
  navigate,
  children,
  redirect,
  message
}) {
  return (
    <CustomRedirect
      navigate={navigate}
      children={children}
      message={message}
      redirectBack={redirect}
      redirect="/sign-in"
    />
  );
}
