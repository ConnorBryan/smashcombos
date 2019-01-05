import React from "react";
import { Link } from "gatsby";
import { Segment, Button, Grid, Header } from "semantic-ui-react";

import { weightClassToTag } from "../helpers";
import * as styles from "../styles";
import CharacterPortrait from "./character-portrait";
import PlaceholderPanel from "./placeholder-panel";
import Tagbar from "./tagbar";

export default function CharacterProfile({
  basic,
  slug,
  image,
  name,
  description,
  weightClass,
  tags
}) {
  return (
    <Grid
      style={{
        marginBottom: "2rem"
      }}
    >
      {!basic && (
        <Grid.Column width={16}>
          <Button
            as={Link}
            to={`/${slug}/edit`}
            floated="right"
            style={{ width: "8rem" }}
          >
            Edit
          </Button>
        </Grid.Column>
      )}
      <Grid.Column mobile={16} tablet={16} computer={6} verticalAlign="middle">
        <CharacterPortrait name={name} image={image} />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={16} computer={10}>
        <Segment basic>
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
            <PlaceholderPanel>
              This character has no description.
            </PlaceholderPanel>
          )}
          <Tagbar
            tags={[weightClassToTag[weightClass], ...tags]}
            style={{
              marginTop: "2rem"
            }}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
