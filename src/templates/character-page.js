import React, { Component } from "react";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import {
  Grid,
  Header,
  Item,
  Icon,
  Label,
  List,
  Menu,
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
      }
    } = character;

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
        <Segment attached="bottom">
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
