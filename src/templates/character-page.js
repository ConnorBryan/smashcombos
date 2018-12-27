import React, { Component } from "react";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import {
  Card,
  Embed,
  Grid,
  Header,
  Item,
  Icon,
  Label,
  List,
  Menu,
  Responsive,
  Segment,
  Statistic
} from "semantic-ui-react";

import { Layout } from "../_components";
import { getCharacter, getCharacterRender, weightClassToTag } from "../helpers";

export default class CharacterPage extends Component {
  render() {
    const { data } = this.props;
    const character = getCharacter(data);
    const image = getCharacterRender(character);
    const {
      name,
      attributes: {
        weight: { class: weightClass }
      },
      combos
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
        demonstration: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        clips: [
          {
            description: "Lorem ipsum dolor amit sit consecutur.",
            credit: "Jesus",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          }
        ],
        note: "Lorem ipsum dolor sit amet",
        tags: ["Fast Faller", "Big Body"]
      }
    ];

    return (
      <Layout>
        <Segment attached="top">
          <Grid stackable>
            <Grid.Column width={4}>
              <Image
                fluid={image.childImageSharp.fluid}
                style={{ maxWidth: "20rem" }}
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as="h1" style={{ textTransform: "uppercase" }}>
                {name}
              </Header>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
              </p>
              <Segment>
                <List horizontal>
                  <List.Item>
                    <List.Header>Tags</List.Header>
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
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment attached>
          <Header as="h2" style={{ textTransform: "uppercase" }}>
            Combos ({combos.length})
          </Header>
          <Responsive maxWidth={700}>
            <Card.Group>
              {_combos.map(
                ({ input, percentages, demonstration, clips, note, tags }) => (
                  <Card key={input} fluid>
                    <Card.Content>{input}</Card.Content>
                    <Card.Content extra>
                      <Header as="h4" style={{ textTransform: "uppercase" }}>
                        Effective at
                      </Header>
                      <Statistic.Group size="mini" widths={2}>
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
                    </Card.Content>
                    <Card.Content extra>
                      <Header as="h4" style={{ textTransform: "uppercase" }}>
                        Demonstration
                      </Header>
                      <Embed url={demonstration} />
                    </Card.Content>
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
                    <Card.Content extra>
                      <Header as="h4" style={{ textTransform: "uppercase" }}>
                        Notes
                      </Header>
                    </Card.Content>
                  </Card>
                )
              )}
            </Card.Group>
          </Responsive>
          <Responsive minWidth={701}>Derp</Responsive>
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
