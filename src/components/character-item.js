import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-image";
import { Segment, Grid, Header, Statistic } from "semantic-ui-react";

export default function CharacterItem({
  slug,
  image,
  name,
  killConfirmCount,
  comboCount
}) {
  return (
    <Link to={slug}>
      <Segment style={{ marginBottom: "2rem" }}>
        <Grid>
          <Grid.Column width={4}>
            <Image fluid={image.childImageSharp.fluid} />
          </Grid.Column>
          <Grid.Column width={4} verticalAlign="middle">
            <Header
              as="h1"
              textAlign="center"
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.4rem"
              }}
            >
              {name}
            </Header>
          </Grid.Column>
          <Grid.Column
            width={8}
            verticalAlign="middle"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Statistic.Group size="medium">
              <Statistic
                size="huge"
                label="Kill Confirms"
                value={killConfirmCount}
              />
              <Statistic size="huge" label="Combos" value={comboCount} />
            </Statistic.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    </Link>
  );
}
