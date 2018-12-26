import React, { Component } from "react";
import { graphql, Link, StaticQuery } from "gatsby";

import {
  weightClassToTag,
  tagTypeToTag,
  getCharacters,
  getFilteredCharacters
} from "../helpers";
import Button from "./button";
import CharacterStrip from "./character-strip";
import Checkbox from "./checkbox";
import Input from "./input";
import Panel from "./panel";
import "./master.scss";

const SortTypes = {
  AlphabeticalASC: "A-Z",
  AlphabeticalDESC: "Z-A",
  KillConfirmsASC: "Fewest Kill Confirms",
  KillConfirmsDESC: "Most Kill Confirms",
  CombosASC: "Fewest Combos",
  CombosDESC: "Most Combos"
};

const alphabeticalAscSort = (a, b) => a.name.localeCompare(b.name);
const alphabeticalDescSort = (a, b) => b.name.localeCompare(a.name);
const killConfirmsAscSort = (a, b) =>
  a.killConfirms.length - b.killConfirms.length;
const killConfirmsDescSort = (a, b) =>
  b.killConfirms.length - a.killConfirms.length;
const combosAscSort = (a, b) => a.combos.length - b.combos.length;
const combosDescSort = (a, b) => b.combos.length - a.combos.length;

const sortTypesToFunctions = {
  [SortTypes.AlphabeticalASC]: alphabeticalAscSort,
  [SortTypes.AlphabeticalDESC]: alphabeticalDescSort,
  [SortTypes.KillConfirmsASC]: killConfirmsAscSort,
  [SortTypes.KillConfirmsDESC]: killConfirmsDescSort,
  [SortTypes.CombosASC]: combosAscSort,
  [SortTypes.CombosDESC]: combosDescSort
};

const getInitialState = () => ({
  filter: "",
  weightClasses: {
    balloonweight: true,
    featherweight: true,
    lightweight: true,
    middleweight: true,
    heavyweight: true,
    superheavyweight: true
  },
  tags: {
    floatie: true,
    fastFaller: true,
    bigBody: true
  },
  sortBy: SortTypes.AlphabeticalASC
});

class Master extends Component {
  state = {
    showingMore: false,
    ...getInitialState()
  };

  handleFilterChange = ({ target: { value: filter } }) =>
    this.setState({ filter });

  clearFilter = () => this.setState(getInitialState());

  toggleShowingMore = () =>
    this.setState(prevState => ({
      showingMore: !prevState.showingMore
    }));

  setSortBy = sortBy => this.setState({ sortBy });

  toggleShowWeightClass = weightClass =>
    this.setState(prevState => ({
      weightClasses: {
        ...prevState.weightClasses,
        [weightClass]: !prevState.weightClasses[weightClass]
      }
    }));

  toggleShowTag = tag =>
    this.setState(prevState => ({
      tags: {
        ...prevState.tags,
        [tag]: !prevState.tags[tag]
      }
    }));

  render() {
    const { data } = this.props;
    const { filter, showingMore, sortBy, weightClasses, tags } = this.state;
    const characters = getCharacters(data);
    const matches = getFilteredCharacters(characters, filter)
      .filter(character => weightClasses[character.attributes.weight.class])
      .sort(sortTypesToFunctions[sortBy]);

    return (
      <section className="Master">
        <div className="Master-controls">
          <Input
            placeholder="Filter characters..."
            value={filter}
            onChange={this.handleFilterChange}
          />
          <Button onClick={this.toggleShowingMore}>
            {showingMore ? "Less" : "More"}
          </Button>
        </div>
        {showingMore && (
          <Panel className="Master-more">
            <div className="Master-more-segment">
              <h3>Sort by</h3>
              {Object.entries(SortTypes).map(([key, value]) => (
                <Checkbox
                  key={key}
                  label={value}
                  checked={sortBy === value}
                  onClick={() => this.setSortBy(value)}
                />
              ))}
            </div>
            <div className="Master-more-segment">
              <h3>Weight Classes</h3>
              {Object.entries(weightClasses).map(([weightClass, active]) => (
                <Checkbox
                  key={weightClass}
                  label={weightClassToTag[weightClass]}
                  checked={active}
                  onClick={() => this.toggleShowWeightClass(weightClass)}
                />
              ))}
            </div>
            <div className="Master-more-segment">
              <h3>Tags</h3>
              {Object.entries(tags).map(([tag, active]) => (
                <Checkbox
                  key={tag}
                  label={tagTypeToTag[tag]}
                  checked={active}
                  onClick={() => this.toggleShowTag(tag)}
                />
              ))}
            </div>
            <Button className="Master-more-reset" onClick={this.clearFilter}>
              Reset
            </Button>
          </Panel>
        )}
        <ul className="Master-characters">
          {matches.length > 0 ? (
            matches.map(
              ({ slug, name, render, attributes, killConfirms, combos }) => (
                <li key={name}>
                  <Link to={slug}>
                    <CharacterStrip
                      name={name}
                      image={render}
                      attributes={attributes}
                      killConfirms={killConfirms}
                      combos={combos}
                      clickable={true}
                    />
                  </Link>
                </li>
              )
            )
          ) : (
            <Panel className="Master-characters-noMatch">
              <p>No characters match the filter.</p>
              <Button onClick={this.clearFilter}>Clear</Button>
            </Panel>
          )}
        </ul>
      </section>
    );
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query MasterQuery {
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
    `}
    render={data => <Master data={data} />}
  />
);
