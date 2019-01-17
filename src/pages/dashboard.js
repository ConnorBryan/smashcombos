import React from "react";

import { Layout } from "../components";
import { UserContext } from "../components/user-provider";
import { Dashboard } from "../modules";

export default function DashboardPage({ navigate }) {
  return (
    <Layout>
      <UserContext.Consumer>
        {({ user }) => <Dashboard user={user} navigate={navigate} />}
      </UserContext.Consumer>
    </Layout>
  );
}
