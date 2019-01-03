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
      padded="very"
      style={{
        position: "relative"
      }}
    >
      <Header as="h1" style={styles.fancyText}>
        {name}
      </Header>
      <Segment basic style={styles.noSidePadding}>
        <Grid stackable>
          <Grid.Column mobile={16} tablet={16} computer={6} textAlign="center">
            <Image fluid={image.childImageSharp.fluid} />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={10}>
            <div
              style={{
                ...styles.fancyPanel,
                paddingLeft: "2rem"
              }}
            >
              <Header as="h2" style={styles.fancyText}>
                Description
              </Header>
              {description && description !== "..." ? (
                <div
                  style={{
                    maxWidth: "40rem",
                    lineHeight: 1.6,
                    fontSize: "1.2em"
                  }}
                >
                  {description}
                </div>
              ) : (
                <PlaceholderPanel action="Add a description">
                  This character has no description.
                </PlaceholderPanel>
              )}
            </div>
            <div
              style={{
                marginTop: "3rem"
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
