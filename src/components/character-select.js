import React, { Component } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Image from "gatsby-image";
import {
  Grid,
  Segment,
  Button,
  Menu,
  Header,
  Icon,
  Input,
  List,
  Sidebar,
  Dropdown,
  Responsive
} from "semantic-ui-react";
import "./character-select.scss";

import {
  getCharacters,
  SortTypes,
  sortFunctions,
  WeightClasses
} from "../helpers";

function CharacterSelectEntry({
  name,
  render: {
    childImageSharp: { fluid: image }
  },
  slug
}) {
  return (
    <List.Item
      as={Link}
      to={slug}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "1rem"
      }}
    >
      <Image
        fluid={image}
        style={{
          width: "100px",
          height: "100px"
        }}
      />
      <List.Header
        as="h2"
        style={{
          width: "100%",
          textAlign: "right",
          textTransform: "uppercase",
          letterSpacing: "0.33rem"
        }}
      >
        {name}
      </List.Header>
    </List.Item>
  );
}

const getInitialState = () => ({
  filter: "",
  sort: SortTypes.MostCombos,
  weightClass: WeightClasses.All,
  optionsVisible: false
});

export default class CharacterSelect extends Component {
  state = getInitialState();

  reset = () => this.setState(getInitialState());

  /** Filtering */
  handleFilterChange = (_, { value: filter }) =>
    this.setState({
      filter
    });

  /** Sorting */
  handleWeightClassChange = (_, { value: weightClass }) =>
    this.setState({ weightClass });

  handleSortChange = (_, { value: sort }) => this.setState({ sort });

  /** Options */
  showOptions = () => this.setState({ optionsVisible: true });
  hideOptions = () => this.setState({ optionsVisible: false });
  toggleOptions = () =>
    this.setState(prevState => ({
      optionsVisible: !prevState.optionsVisible
    }));

  render() {
    const { filter, sort, weightClass, optionsVisible } = this.state;

    return (
      <StaticQuery
        query={graphql`
          query CharacterSelectQuery {
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
                        fluid(maxWidth: 100, quality: 72) {
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
        `}
        render={data => {
          const characters = getCharacters(data);
          const matches = characters
            .filter(({ name }) =>
              name.toLowerCase().includes(filter.toLowerCase())
            )
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
          const menu = (
            <Menu
              vertical
              fluid
              style={{
                background: "#111"
              }}
            >
              <Menu.Item
                header
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.33rem",
                  color: "#eee"
                }}
              >
                Weight class
              </Menu.Item>
              <Menu.Item>
                <Dropdown
                  fluid
                  selection
                  options={Object.entries(WeightClasses).map(
                    ([key, value]) => ({
                      key,
                      value,
                      text: key
                    })
                  )}
                  value={weightClass}
                  onChange={this.handleWeightClassChange}
                  style={{
                    margin: "1rem 0"
                  }}
                />
              </Menu.Item>
              <Menu.Item
                header
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.33rem",
                  color: "#eee"
                }}
              >
                Sort by
              </Menu.Item>
              <Menu.Item>
                <Dropdown
                  fluid
                  selection
                  options={Object.entries(SortTypes).map(([key, value]) => ({
                    key,
                    value,
                    text: value
                  }))}
                  value={sort}
                  onChange={this.handleSortChange}
                  style={{
                    margin: "1rem 0"
                  }}
                />
              </Menu.Item>
              <Menu.Item fitted>
                <Button.Group widths={2}>
                  <Button onClick={this.reset}>Clear</Button>
                  <Button primary onClick={this.hideOptions}>
                    Close
                  </Button>
                </Button.Group>
              </Menu.Item>
            </Menu>
          );
          const list = (
            <List className="sc-list" celled selection>
              <Header as="h3" textAlign="right">
                Showing {matches.length} of {characters.length}
              </Header>
              {matches.length > 0 ? (
                matches.map(character => (
                  <CharacterSelectEntry key={character.name} {...character} />
                ))
              ) : (
                <List.Item>
                  <Segment placeholder style={{ width: "100%" }}>
                    <Header icon>
                      <Icon name="warning" />
                      No characters match the filter.
                    </Header>
                    <Button
                      primary
                      onClick={this.reset}
                      style={{
                        marginTop: "1rem"
                      }}
                    >
                      Clear Filter
                    </Button>
                  </Segment>
                </List.Item>
              )}
            </List>
          );

          return (
            <Grid>
              <Grid.Column mobile={16} tablet={16} computer={6}>
                <Menu
                  style={{
                    border: "none",
                    boxShadow: "none"
                  }}
                >
                  <Input
                    style={{ width: "100%" }}
                    size="huge"
                    placeholder="Filter characters..."
                    icon="filter"
                    onChange={this.handleFilterChange}
                  />
                  <Responsive maxWidth={991}>
                    <Menu.Menu position="right">
                      <Menu.Item>
                        <Button
                          primary
                          icon="bars"
                          onClick={this.toggleOptions}
                        />
                      </Menu.Item>
                    </Menu.Menu>
                  </Responsive>
                </Menu>
                <Responsive minWidth={991}>{menu}</Responsive>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={10}>
                <Responsive maxWidth={991}>
                  <Sidebar.Pushable>
                    <Sidebar
                      animation="overlay"
                      width="wide"
                      visible={optionsVisible}
                      style={{
                        maxWidth: "80vw",
                        boxShadow: "none"
                      }}
                    >
                      {menu}
                    </Sidebar>
                    {list}
                  </Sidebar.Pushable>
                </Responsive>
                <Responsive minWidth={992}>{list}</Responsive>
              </Grid.Column>
            </Grid>
          );
        }}
      />
    );
  }
}
