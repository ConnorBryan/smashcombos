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
          <Grid.Column width={6}>
            <Image fluid={image.childImageSharp.fluid} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Header
              as="h1"
              textAlign="right"
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.4rem"
              }}
            >
              {name}
            </Header>
            <Statistic.Group
              size="huge"
              widths={2}
              horizontal
              style={{
                alignItems: "flex-end",
                justifyContent: "flex-end"
              }}
            >
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
