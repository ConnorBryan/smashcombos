import React, { Component } from "react";
import { graphql } from "gatsby";
import {
  Button,
  Dropdown,
  Grid,
  Header,
  Icon,
  Input,
  Menu,
  Segment,
  Sticky
} from "semantic-ui-react";

import { CharacterItem, Layout } from "../components";
import {
  getCharacters,
  SortTypes,
  sortFunctions,
  WeightClasses
} from "../helpers";
import "./index.scss";

const getInitialState = () => ({
  filter: "",
  sort: SortTypes.MostCombos,
  weightClass: WeightClasses.All
});

export default class IndexPage extends Component {
  state = {
    ...getInitialState(),
    pushed: false
  };

  resetControls = () => this.setState(getInitialState());

  handleFilterChange = (_, { value: filter }) =>
    this.setState({
      filter
    });

  handleSortChange = (_, { value: sort }) => this.setState({ sort });

  handleWeightClassChange = (_, { value: weightClass }) =>
    this.setState({ weightClass });

  handleContextRef = contextRef => this.setState({ contextRef });

  setPushed = pushed =>
    this.setState({
      pushed
    });

  render() {
    const { data } = this.props;
    const { filter, sort, weightClass, contextRef, pushed } = this.state;
    const characters = getCharacters(data);
    const matches = characters
      .filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
      .sort(sortFunctions[sort])
      .filter(
        ({
          attributes: {
            weight: { class: weightClassComparison }
          }
        }) => {
          return (
            weightClass === WeightClasses.All ||
            weightClass === weightClassComparison
          );
        }
      );
    const characterItems =
      matches.length > 0 ? (
        matches.map(
          ({ name, render, slug, attributes, killConfirms, combos }) => (
            <CharacterItem
              key={name}
              name={name}
              image={render}
              slug={slug}
              killConfirmCount={killConfirms.length}
              comboCount={combos.length}
            />
          )
        )
      ) : (
        <Segment placeholder style={{ width: "100%" }}>
          <Header icon>
            <Icon name="warning" />
            No characters match the filter.
          </Header>
          <Button primary onClick={this.resetControls}>
            Clear Filter
          </Button>
        </Segment>
      );

    return (
      <Layout>
        <div ref={this.handleContextRef}>
          <Segment basic>
            <Grid>
              <Grid.Column mobile={16} tablet={16} computer={6}>
                <Sticky
                  context={contextRef}
                  offset={100}
                  onStick={() => this.setPushed(true)}
                  onUnstick={() => this.setPushed(false)}
                >
                  <Menu size="huge" vertical fluid>
                    <Menu.Item>
                      <Input
                        placeholder="Filter characters..."
                        value={filter}
                        icon="filter"
                        onChange={this.handleFilterChange}
                      />
                    </Menu.Item>
                    <Menu.Item>
                      <Dropdown
                        fluid
                        selection
                        value={sort}
                        options={Object.entries(SortTypes).map(
                          ([key, value]) => ({
                            key,
                            value,
                            text: value
                          })
                        )}
                        onChange={this.handleSortChange}
                      />
                    </Menu.Item>
                    <Menu.Item>
                      <Dropdown
                        fluid
                        selection
                        value={weightClass}
                        options={Object.entries(WeightClasses).map(
                          ([key, value]) => ({
                            key,
                            value,
                            text: key
                          })
                        )}
                        onChange={this.handleWeightClassChange}
                      />
                    </Menu.Item>
                    <Menu.Item>
                      <Button primary fluid onClick={this.resetControls}>
                        Clear Filter
                      </Button>
                    </Menu.Item>
                  </Menu>
                </Sticky>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={10}>
                <div className="mobile-only">
                  <Segment.Group
                    style={{
                      marginTop: pushed ? "30vh" : 0
                    }}
                  >
                    {characterItems}
                  </Segment.Group>
                </div>
                <div className="desktop-only">{characterItems}</div>
              </Grid.Column>
            </Grid>
          </Segment>
        </div>
      </Layout>
    );
  }
}

export const query = graphql`
  query IndexPageQuery {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
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
              airAcceleration {
                rank
              }
              airSpeed {
                rank
              }
              fallSpeed {
                rank
              }
              runSpeed {
                rank
              }
              walkSpeed {
                rank
              }
              weight {
                class
                rank
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
                superheavyweight
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
                superheavyweight
              }
            }
          }
        }
      }
    }
  }
`;
