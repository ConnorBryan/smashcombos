import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-image";
import { Segment, Button, Grid, Header } from "semantic-ui-react";

import { weightClassToTag } from "../helpers";
import * as styles from "../styles";
import PlaceholderPanel from "./placeholder-panel";
import Tagbar from "./tagbar";

export default function CharacterProfile({
  slug,
  image,
  name,
  description,
  weightClass,
  tags
}) {
  return (
    <Segment
      attached="top"
      style={{
        position: "relative"
      }}
    >
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
            <Header as="h3" style={styles.fancyText}>
              Description
            </Header>
            {description && description !== "..." ? (
              <div
                style={{
                  ...styles.fancyPanel,
                  maxWidth: "50rem",
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
      <Button
        as={Link}
        to={`/${slug}/edit`}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem"
        }}
      >
        Edit
      </Button>
    </Segment>
  );
}
