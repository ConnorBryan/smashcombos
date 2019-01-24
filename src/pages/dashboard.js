import React from "react";

import { Dashboard, Layout } from "../modules";
import { UserContext } from "../providers";
import { AuthRedirect } from "../utils";

export default function DashboardPage({ navigate }) {
  return (
    <Layout navigate={navigate}>
      <AuthRedirect navigate={navigate}>
        <UserContext.Consumer>
          {({ user }) => user && <Dashboard user={user} />}
        </UserContext.Consumer>
      </AuthRedirect>
    </Layout>
  );
}
