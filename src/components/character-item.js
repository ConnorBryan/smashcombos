import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-image";
import { Segment, Grid, Header, Statistic } from "semantic-ui-react";

export default function CharacterItem() {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={4}>Image</Grid.Column>
        <Grid.Column width={12}>
          <Header>Header</Header>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
