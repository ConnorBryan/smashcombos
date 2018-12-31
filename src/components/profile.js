import React from "react";
import Image from "gatsby-image";
import { Segment, Grid, Header } from "semantic-ui-react";

import { weightClassToTag } from "../helpers";
import * as styles from "../styles";
import Tagbar from "./tagbar";

export default function CharacterProfile({
  image,
  name,
  description,
  weightClass,
  tags
}) {
  return (
    <Segment attached="top">
      <Grid stackable>
        <Grid.Column width={4} textAlign="center">
          <Image fluid={image.childImageSharp.fluid} />
        </Grid.Column>
        <Grid.Column width={12}>
          <Header as="h1" style={styles.fancyText}>
            {name}
          </Header>
          {description}
          <Segment basic>
            <Tagbar tags={[weightClassToTag[weightClass], ...tags]} />
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
