import React from "react";

import Layout from "./layout";
import Redirect from "./redirect";

export default function AuthRedirect({ navigate, children }) {
  return (
    <Layout>
      <Redirect navigate={navigate} children={children} redirect="/sign-in" />
    </Layout>
  );
}
