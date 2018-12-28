import React from "react";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import {
  Card,
  Embed,
  Grid,
  Header,
  Label,
  List,
  Segment,
  Statistic
} from "semantic-ui-react";

import { AttributePanel, Input, Layout } from "../components";
import {
  getCharacter,
  getCharacterRender,
  weightClassToTag,
  tagTypeToTag
} from "../helpers";
import "./character-page.scss";

export default function CharacterPage({ data }) {
  const character = getCharacter(data);
  const image = getCharacterRender(character);
  const { name, description, attributes, combos, tags } = character;
  const {
    weight: { class: weightClass }
  } = attributes;

  return (
    <Layout>
      {/* Profile */}
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
      <AttributePanel attributes={attributes} />
      {/* Combos */}
      <Segment attached>
        <Header as="h2" style={{ textTransform: "uppercase" }}>
          Combos
        </Header>
        {/* Mobile */}
        <div className="mobile-only">
          <Card.Group>
            {combos.map(
              ({
                input,
                percentages,
                damage,
                diable,
                killConfirm,
                demonstration = "",
                clips = [],
                notes,
                tags = []
              }) => (
                <Card key={input} fluid>
                  <Card.Content>
                    <Grid>
                      <Grid.Column width={8}>
                        <Input input={input} />
                      </Grid.Column>
                      <Grid.Column
                        width={8}
                        floated="right"
                        style={{ paddingRight: "1rem" }}
                      >
                        <Statistic.Group size="tiny" widths={1}>
                          <Statistic
                            label="Balloonweight"
                            value={`${percentages.balloonweight}%`}
                          />
                          <Statistic
                            label="Featherweight"
                            value={`${percentages.featherweight}%`}
                          />
                          <Statistic
                            label="Lightweight"
                            value={`${percentages.lightweight}%`}
                          />
                          <Statistic
                            label="Middleweight"
                            value={`${percentages.middleweight}%`}
                          />
                          <Statistic
                            label="Heavyweight"
                            value={`${percentages.heavyweight}%`}
                          />
                          <Statistic
                            label="Super Heavyweight"
                            value={`${percentages.superHeavyweight}%`}
                          />
                        </Statistic.Group>
                      </Grid.Column>
                    </Grid>
                  </Card.Content>
                  <Card.Content extra>
                    <Label as="h4" style={{ textTransform: "uppercase" }}>
                      Deals {damage}% damage
                    </Label>
                    {killConfirm && (
                      <Label as="h4" style={{ textTransform: "uppercase" }}>
                        Kill confirm
                      </Label>
                    )}
                    <Label as="h4" style={{ textTransform: "uppercase" }}>
                      {diable ? "" : "Not"} DI-able
                    </Label>
                  </Card.Content>
                  {demonstration && (
                    <Card.Content extra>
                      <Header as="h4" style={{ textTransform: "uppercase" }}>
                        Demonstration
                      </Header>
                      <Embed url={demonstration} />
                    </Card.Content>
                  )}
                  {(clips || []).length > 0 && (
                    <Card.Content extra>
                      <Header as="h4" style={{ textTransform: "uppercase" }}>
                        Clips
                      </Header>
                      {clips.map(({ description, credit, link }) => (
                        <React.Fragment key={link}>
                          <Embed url={link} />
                          <Card.Description>
                            <Label style={{ marginTop: "1rem", width: "100%" }}>
                              {description} Credit to {credit}.
                            </Label>
                          </Card.Description>
                        </React.Fragment>
                      ))}
                    </Card.Content>
                  )}
                  <Card.Content extra>
                    <Header as="h4" style={{ textTransform: "uppercase" }}>
                      Notes
                    </Header>
                    {notes}
                  </Card.Content>
                  <Card.Content extra>
                    <Header as="h4" style={{ textTransform: "uppercase" }}>
                      Tags
                    </Header>
                    {(tags || []).map(tag => (
                      <Label key={tag}>{tag}</Label>
                    ))}
                  </Card.Content>
                </Card>
              )
            )}
          </Card.Group>
        </div>
        {/* Desktop */}
        <div className="desktop-only">
          <Segment.Group
            style={{
              border: "none",
              boxShadow: "none"
            }}
          >
            {combos.map(
              ({
                input,
                percentages,
                damage,
                killConfirm,
                diable,
                demonstration = "",
                clips = [],
                notes,
                tags = []
              }) => (
                <Segment key={input} basic>
                  <Segment.Group
                    horizontal
                    style={{ marginBottom: 0, borderBottom: "none" }}
                  >
                    <Segment
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                      }}
                    >
                      <Input input={input} />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%"
                        }}
                      >
                        <Label
                          as="h4"
                          style={{
                            width: "100%",
                            margin: 0,
                            marginBottom: "0.5rem",
                            textTransform: "uppercase"
                          }}
                        >
                          Deals {damage}% damage
                        </Label>
                        {killConfirm && (
                          <Label
                            as="h4"
                            style={{
                              width: "100%",
                              margin: 0,
                              marginBottom: "0.5rem",
                              textTransform: "uppercase"
                            }}
                          >
                            Kill confirm
                          </Label>
                        )}
                        <Label
                          as="h4"
                          style={{
                            width: "100%",
                            margin: 0,
                            textTransform: "uppercase"
                          }}
                        >
                          {diable ? "" : "Not"} DI-able
                        </Label>
                      </div>
                    </Segment>
                    <Segment
                      style={{
                        flex: 1
                      }}
                    >
                      <Statistic.Group size="mini" widths={1}>
                        <Statistic
                          label="Balloonweight"
                          value={`${percentages.balloonweight}%`}
                        />
                        <Statistic
                          label="Featherweight"
                          value={`${percentages.featherweight}%`}
                        />
                        <Statistic
                          label="Lightweight"
                          value={`${percentages.lightweight}%`}
                        />
                        <Statistic
                          label="Middleweight"
                          value={`${percentages.middleweight}%`}
                        />
                        <Statistic
                          label="Heavyweight"
                          value={`${percentages.heavyweight}%`}
                        />
                        <Statistic
                          label="Super Heavyweight"
                          value={`${percentages.superHeavyweight}%`}
                        />
                      </Statistic.Group>
                    </Segment>
                    {demonstration && (
                      <Segment
                        style={{
                          flex: 1
                        }}
                      >
                        <Header as="h4" style={{ textTransform: "uppercase" }}>
                          Demonstration
                        </Header>
                        <Embed url={demonstration} />
                      </Segment>
                    )}
                    {(clips || []).length > 0 && (
                      <Segment
                        style={{
                          flex: 1
                        }}
                      >
                        <Header as="h4" style={{ textTransform: "uppercase" }}>
                          Clips
                        </Header>
                        {[].map(({ description, credit, link }) => (
                          <React.Fragment key={link}>
                            <Embed url={link} />
                            <Card.Description>
                              <Label
                                style={{ marginTop: "1rem", width: "100%" }}
                              >
                                {description} Credit to {credit}.
                              </Label>
                            </Card.Description>
                          </React.Fragment>
                        ))}
                      </Segment>
                    )}
                  </Segment.Group>
                  <Segment.Group horizontal style={{ marginTop: 0 }}>
                    <Segment style={{ flex: 1 }}>
                      <Header as="h4" style={{ textTransform: "uppercase" }}>
                        Notes
                      </Header>
                      {notes}
                    </Segment>
                    <Segment
                      style={{
                        flex: 1,
                        overflowX: "auto",
                        overflowY: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      <Header as="h4" style={{ textTransform: "uppercase" }}>
                        Tags
                      </Header>
                      <ul
                        style={{
                          margin: 0,
                          padding: 0
                        }}
                      >
                        {[].map(tag => (
                          <Label as="li" key={tag}>
                            {tag}
                          </Label>
                        ))}
                      </ul>
                    </Segment>
                  </Segment.Group>
                </Segment>
              )
            )}
          </Segment.Group>
        </div>
      </Segment>
    </Layout>
  );
}

export const characterPageQuery = graphql`
  query CharacterPageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        name
        render {
          childImageSharp {
            fluid(maxWidth: 1075, quality: 72) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
        attributes {
          airAcceleration {
            maxAdditional
            baseValue
            total
            rank
          }
          airSpeed {
            maxAirSpeed
            rank
          }
          fallSpeed {
            maxFallSpeed
            fastFallSpeed
            speedIncrease
            rank
          }
          runSpeed {
            maxRunSpeed
            rank
          }
          walkSpeed {
            maxWalkSpeed
            rank
          }
          weight {
            class
            rank
            value
          }
        }
        killConfirms {
          input
          percentages {
            balloonweight
            featherweight
            lightweight
            middleweight
            heavyweight
            superHeavyweight
          }
        }
        combos {
          input
          percentages {
            balloonweight
            featherweight
            lightweight
            middleweight
            heavyweight
            superHeavyweight
          }
          damage
          killConfirm
          diable
          demonstration
          clips
          tags
          notes
        }
      }
    }
  }
`;
