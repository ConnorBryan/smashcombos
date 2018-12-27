import React, { Component } from "react";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import {
  Card,
  Embed,
  Grid,
  Header,
  Icon,
  Label,
  List,
  Menu,
  Segment,
  Statistic
} from "semantic-ui-react";

import { Input, Layout } from "../_components";
import { getCharacter, getCharacterRender, weightClassToTag } from "../helpers";
import "./character-page.scss";

export default class CharacterPage extends Component {
  render() {
    const { data } = this.props;
    const character = getCharacter(data);
    const image = getCharacterRender(character);
    const {
      name,
      attributes: {
        weight: { class: weightClass }
      }
    } = character;

    const _combos = [
      {
        input: "dthrow nair usmash",
        percentages: {
          balloonweight: "30",
          featherweight: "30",
          lightweight: "30",
          middleweight: "30",
          heavyweight: "30",
          superheavyweight: "30"
        },
        damage: "27",
        diable: false,
        killConfirm: true,
        demonstration: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        clips: [
          {
            description: "Lorem ipsum dolor amit sit consecutur.",
            credit: "Jesus",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          }
        ],
        notes: "Lorem ipsum dolor sit amet",
        tags: ["Fast Faller", "Big Body"]
      }
    ];

    return (
      <Layout>
        <Segment attached="top">
          <Grid stackable>
            <Grid.Column width={4} textAlign="center">
              <Image fluid={image.childImageSharp.fluid} />
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as="h1" style={{ textTransform: "uppercase" }}>
                {name}
              </Header>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?
              <Segment>
                <List horizontal>
                  <List.Item>
                    <List.Header style={{ textTransform: "uppercase" }}>
                      Tags
                    </List.Header>
                  </List.Item>
                  <List.Item>
                    <Label tag>{weightClassToTag[weightClass]}</Label>
                  </List.Item>
                </List>
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Header as="h2" style={{ textTransform: "uppercase" }}>
            Attributes
          </Header>
          <Grid stackable>
            <Grid.Row stretched>
              <Grid.Column width={4}>
                <Menu vertical size="large" fluid>
                  <Menu.Item active style={{ textTransform: "uppercase" }}>
                    Air Acceleration
                  </Menu.Item>
                  <Menu.Item style={{ textTransform: "uppercase" }}>
                    Air Speed
                  </Menu.Item>
                  <Menu.Item style={{ textTransform: "uppercase" }}>
                    Fall Speed
                  </Menu.Item>
                  <Menu.Item style={{ textTransform: "uppercase" }}>
                    Run Speed
                  </Menu.Item>
                  <Menu.Item style={{ textTransform: "uppercase" }}>
                    Walk Speed
                  </Menu.Item>
                  <Menu.Item style={{ textTransform: "uppercase" }}>
                    Weight
                  </Menu.Item>
                </Menu>
              </Grid.Column>
              <Grid.Column width={12}>
                <Segment>
                  <Header as="h3" style={{ textTransform: "uppercase" }}>
                    Air Acceleration
                    <Label>
                      <Icon name="trophy" />
                      Rank 1 of 77
                    </Label>
                  </Header>
                  <Statistic.Group size="huge" widths={3}>
                    <Statistic label="Max Additional" value="0" />
                    <Statistic label="Base Value" value="0" />
                    <Statistic label="Total" value="0" />
                  </Statistic.Group>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment attached>
          <Header as="h2" style={{ textTransform: "uppercase" }}>
            Combos
          </Header>
          {/* Mobile */}
          <div className="mobile-only">
            <Card.Group>
              {_combos.map(
                ({
                  input,
                  percentages,
                  damage,
                  diable,
                  killConfirm,
                  demonstration,
                  clips,
                  notes,
                  tags
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
                              value={`${percentages.superheavyweight}%`}
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
                    <Card.Content extra>
                      <Header as="h4" style={{ textTransform: "uppercase" }}>
                        Demonstration
                      </Header>
                      <Embed url={demonstration} />
                    </Card.Content>
                    {clips.length > 0 && (
                      <Card.Content extra>
                        <Header as="h4" style={{ textTransform: "uppercase" }}>
                          Clips
                        </Header>
                        {clips.map(({ description, credit, link }) => (
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
                      {tags.map(tag => (
                        <Label key={tag} tag>
                          {tag}
                        </Label>
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
              {_combos.map(
                ({
                  input,
                  percentages,
                  damage,
                  killConfirm,
                  diable,
                  demonstration,
                  clips,
                  notes,
                  tags
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
                            value={`${percentages.superheavyweight}%`}
                          />
                        </Statistic.Group>
                      </Segment>
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
                      {clips.length > 0 && (
                        <Segment
                          style={{
                            flex: 1
                          }}
                        >
                          <Header
                            as="h4"
                            style={{ textTransform: "uppercase" }}
                          >
                            Clips
                          </Header>
                          {clips.map(({ description, credit, link }) => (
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
                          {tags.map(tag => (
                            <Label as="li" key={tag} tag>
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
        attributes {
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
        }
      }
    }
  }
`;
