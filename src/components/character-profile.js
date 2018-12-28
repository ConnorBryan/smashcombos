import React from "react";
import Image from "gatsby-image";
import { Segment, Grid, Header, List, Label } from "semantic-ui-react";

import { weightClassToTag, tagTypeToTag } from "../helpers";

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
          <Header as="h1" style={{ textTransform: "uppercase" }}>
            {name}
          </Header>
          {description}
          <Segment>
            <List horizontal>
              <List.Item>
                <List.Header style={{ textTransform: "uppercase" }}>
                  Tags
                </List.Header>
              </List.Item>
              <List.Item>
                <Label>{weightClassToTag[weightClass]}</Label>
                {tags.map((tag, index) => (
                  <Label key={index}>{tagTypeToTag[tag]}</Label>
                ))}
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
