import React from "react";
import { Header, Segment } from "semantic-ui-react";

import SectionHeader from "./SectionHeader";

export default function LeaderboardPosition() {
  return (
    <>
      <SectionHeader
        header="Leaderboard Position"
        description="Find out how you measure up on the GCP leaderboard."
      />
      <Segment placeholder textAlign="center">
        <Header as="h2" content="Coming soon." />
      </Segment>
    </>
  );
}
