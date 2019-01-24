import React from "react";

import Layout from "./layout";
import Redirect from "./redirect";

export default function AuthRedirect({
  navigate,
  children,
  redirect,
  message
}) {
  return (
    <Layout navigate={navigate}>
      <Redirect
        navigate={navigate}
        children={children}
        message={message}
        redirectBack={redirect}
        redirect="/sign-in"
      />
    </Layout>
  );
}
