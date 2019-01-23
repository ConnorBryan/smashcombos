import React from "react";
import { Grid } from "semantic-ui-react";

import { Hero } from "../../components";
import dashboard from "../../img/dashboard.svg";
import {
  AccountInformation,
  Contributions,
  LeaderboardPosition,
  SavedCharacters,
  SavedCombos
} from "./components";

export default function Dashboard({ user }) {
  return (
    <>
      <Hero
        image={dashboard}
        header="Your Dashboard"
        description="This is your corner of SmashCombos. Soon, you'll be able to view your position on the GCP leaderboard, view your combo additions and edits, quickly access saved characters and combos, and more."
      />
      <Grid>
        <Grid.Column mobile={16} tablet={16} computer={8}>
          <AccountInformation user={user} />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={8}>
          <LeaderboardPosition />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={8}>
          <SavedCharacters />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={8}>
          <SavedCombos />
        </Grid.Column>
        <Grid.Column width={16}>
          <Contributions />
        </Grid.Column>
      </Grid>
    </>
  );
}
