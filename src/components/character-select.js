import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
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
  Dropdown
} from "semantic-ui-react";

import * as styles from "../styles";
import {
  getCharacters,
  SortTypes,
  sortFunctions,
  WeightClasses,
  sortTypesToPhrasesHash,
  weightClassesToPhrasesHash
} from "../helpers";
import CharacterSelectEntry from "./character-select-entry";

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
            allCharactersJson {
              edges {
                node {
                  name
                  render {
                    childImageSharp {
                      fluid(maxWidth: 100, quality: 72) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  slug
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
                  tags
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
            <React.Fragment>
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
                    ...styles.fancyText,
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
                    ...styles.fancyText,
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
                  <Button.Group className="mobile-only" widths={2}>
                    <Button onClick={this.reset}>Clear</Button>
                    <Button primary onClick={this.hideOptions}>
                      Close
                    </Button>
                  </Button.Group>
                  <Button
                    className="desktop-only"
                    fluid
                    size="large"
                    onClick={this.reset}
                  >
                    Clear
                  </Button>
                </Menu.Item>
                <Menu.Item
                  style={{
                    padding: 0
                  }}
                >
                  <Button
                    as="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://discord.gg/EMVEzhS"
                    primary
                    size="large"
                    icon
                    fluid
                  >
                    <Icon name="discord" /> Join the Discord
                  </Button>
                </Menu.Item>
              </Menu>
            </React.Fragment>
          );
          const list = (
            <React.Fragment>
              <Header
                as="p"
                textAlign="right"
                className="desktop-only"
                style={{
                  marginBottom: 0,
                  paddingBottom: "1rem",
                  borderBottom: "1px solid #7289D8",
                  fontSize: "12px"
                }}
              >
                Showing {matches.length} of {characters.length} characters,
                <br /> {weightClassesToPhrasesHash[weightClass]}, sorted{" "}
                {sortTypesToPhrasesHash[sort]}.
              </Header>
              <List
                className="sc-list"
                divided
                selection
                style={{ marginTop: 0 }}
              >
                {matches.length > 0 ? (
                  matches.map(character => (
                    <CharacterSelectEntry
                      key={character.name}
                      {...character}
                      comboCount={character.combos.length}
                    />
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
            </React.Fragment>
          );

          return (
            <Grid>
              <Grid.Column mobile={16} tablet={16} computer={6}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Input
                    style={{ flex: 3, width: "100%" }}
                    size="huge"
                    placeholder="Filter characters..."
                    icon="filter"
                    onChange={this.handleFilterChange}
                  />
                  <div
                    className="mobile-only"
                    style={{ flex: 1, textAlign: "right" }}
                  >
                    <Button
                      primary
                      size="huge"
                      icon="sort"
                      onClick={this.toggleOptions}
                    />
                  </div>
                </div>
                <div className="desktop-only">{menu}</div>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={16} computer={10}>
                <Sidebar.Pushable className="mobile-only">
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
                <div className="desktop-only">{list}</div>
              </Grid.Column>
            </Grid>
          );
        }}
      />
    );
  }
}
