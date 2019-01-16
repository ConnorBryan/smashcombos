import React from "react";
import { Grid } from "semantic-ui-react";

import Attributes from "./attributes";
import CharacterPortrait from "./character-portrait";

export default function CharacterProfile({
  basic,
  slug,
  image,
  name,
  description,
  weightClass,
  tags,
  attributes
}) {
  return (
    <Grid
      style={{
        marginBottom: "2rem"
      }}
    >
      <Grid.Column mobile={16} tablet={16} computer={6} verticalAlign="middle">
        <CharacterPortrait name={name} image={image} />
      </Grid.Column>
      <Grid.Column
        className="desktop-only"
        mobile={16}
        tablet={16}
        computer={10}
        verticalAlign="bottom"
      >
        {attributes && <Attributes attributes={attributes} />}
      </Grid.Column>
    </Grid>
  );
}
