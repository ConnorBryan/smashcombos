import React from "react";

import { AuthRedirect } from "../components";
import { UserContext } from "../components/user-provider";
import { Dashboard } from "../modules";

export default function DashboardPage({ navigate }) {
  return (
    <AuthRedirect navigate={navigate}>
      <UserContext.Consumer>
        {({ user }) => <Dashboard user={user} />}
      </UserContext.Consumer>
    </AuthRedirect>
  );
}
