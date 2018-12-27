import React, { Component } from "react";
import { graphql } from "gatsby";
import {
  Button,
  Card,
  Dropdown,
  Grid,
  Header,
  Icon,
  Input,
  Menu,
  Segment,
  Select
} from "semantic-ui-react";

import { CharacterItem, Layout } from "../_components";
import { getCharacters } from "../helpers";

const SortTypes = {
  AtoZ: "A-Z",
  ZtoA: "Z-A",
  FewestKillConfirms: "Fewest Kill Confirms",
  MostKillConfirms: "Most Kill Confirms",
  FewestCombos: "Fewest Combos",
  MostCombos: "Most Combos"
};

const sortFunctions = {
  [SortTypes.AtoZ]: (a, b) => a.name.localeCompare(b.name),
  [SortTypes.ZtoA]: (a, b) => b.name.localeCompare(a.name),
  [SortTypes.FewestKillConfirms]: (a, b) =>
    a.killConfirms.length - b.killConfirms.length,
  [SortTypes.MostKillConfirms]: (a, b) =>
    b.killConfirms.length - a.killConfirms.length,
  [SortTypes.FewestCombos]: (a, b) => a.combos.length - b.combos.length,
  [SortTypes.MostCombos]: (a, b) => b.combos.length - a.combos.length
};

const WeightClasses = {
  All: "All weight classes",
  Balloonweight: "balloonweight",
  Featherweight: "featherweight",
  Lightweight: "lightweight",
  Middleweight: "middleweight",
  Heavyweight: "heavyweight",
  "Super Heavyweight": "superheavyweight"
};

const getInitialState = () => ({
  filter: "",
  sort: SortTypes.AtoZ,
  weightClass: WeightClasses.All
});

export default class IndexPage extends Component {
  state = getInitialState();

  resetControls = () => this.setState(getInitialState());

  handleFilterChange = (_, { value: filter }) =>
    this.setState({
      filter
    });

  handleSortChange = (_, { value: sort }) => this.setState({ sort });

  handleWeightClassChange = (_, { value: weightClass }) =>
    this.setState({ weightClass });

  render() {
    const { data } = this.props;
    const { filter, sort, weightClass } = this.state;
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

    return (
      <Layout>
        <Menu size="large" widths={4} stackable>
          <Menu.Item>
            <Input
              placeholder="Filter characters..."
              value={filter}
              icon="filter"
              style={{ margin: "0 2rem" }}
              onChange={this.handleFilterChange}
            />
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              fluid
              selection
              style={{ margin: "0 2rem" }}
              value={sort}
              options={Object.entries(SortTypes).map(([key, value]) => ({
                key,
                value,
                text: value
              }))}
              onChange={this.handleSortChange}
            />
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              fluid
              selection
              style={{ margin: "0 2rem" }}
              value={weightClass}
              options={Object.entries(WeightClasses).map(([key, value]) => ({
                key,
                value,
                text: key
              }))}
              onChange={this.handleWeightClassChange}
            />
          </Menu.Item>
          <Menu.Item>
            <Button
              fluid
              onClick={this.resetControls}
              style={{ margin: "0 2rem" }}
            >
              Clear Filter
            </Button>
          </Menu.Item>
        </Menu>
        <Segment basic>
          <Card.Group stackable itemsPerRow={4}>
            {matches.length > 0 ? (
              matches.map(
                ({ name, render, slug, attributes, killConfirms, combos }) => (
                  <CharacterItem
                    key={name}
                    name={name}
                    image={render}
                    slug={slug}
                    attributes={attributes}
                    killConfirms={killConfirms}
                    combos={combos}
                  />
                )
              )
            ) : (
              <Segment placeholder>
                <Header icon>
                  <Icon name="warning" />
                  No characters match the filter.
                </Header>
                <Button primary onClick={this.resetControls}>
                  Clear Filter
                </Button>
              </Segment>
            )}
          </Card.Group>
        </Segment>
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
              weight {
                class
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
    }
  }
`;
