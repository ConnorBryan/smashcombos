import React from "react";
import Image from "gatsby-image";
import { Segment, Grid, Header } from "semantic-ui-react";

import { weightClassToTag } from "../helpers";
import * as styles from "../styles";
import PlaceholderPanel from "./placeholder-panel";
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
      <Header as="h1" style={styles.fancyText}>
        {name}
      </Header>
      <Segment basic style={styles.noSidePadding}>
        <Grid stackable>
          <Grid.Column width={4} textAlign="center">
            <Image fluid={image.childImageSharp.fluid} />
          </Grid.Column>
          <Grid.Column
            width={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Header
              as="h3"
              style={{
                ...styles.fancyText
              }}
            >
              Description
            </Header>
            {description && description !== "..." ? (
              <div
                style={{
                  maxWidth: "50rem",
                  paddingLeft: "1rem",
                  borderLeft: "1px solid #738BD6",
                  lineHeight: 1.7
                }}
              >
                {description}
              </div>
            ) : (
              <PlaceholderPanel action="Add a description">
                This character has no description.
              </PlaceholderPanel>
            )}
            <div
              style={{
                marginTop: "2rem"
              }}
            >
              <Tagbar tags={[weightClassToTag[weightClass], ...tags]} />
            </div>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment>
  );
}
