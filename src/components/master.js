import React, { Component } from "react";
import { graphql, Link, StaticQuery } from "gatsby";

import Button from "./button";
import CharacterStrip from "./character-strip";
import Input from "./input";
import Panel from "./panel";
import "./master.scss";

const getCharacters = data =>
  data.allMarkdownRemark.edges
    .map(({ node }) => node)
    .filter(({ fields: { slug } }) => slug.includes("characters"))
    .map(({ fields: { slug }, frontmatter }) => ({
      slug,
      ...frontmatter
    }));

const getFilteredCharacters = (characters, filter) =>
  characters.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

class Master extends Component {
  state = {
    filter: ""
  };

  handleFilterChange = ({ target: { value: filter } }) =>
    this.setState({ filter });

  clearFilter = () => this.setState({ filter: "" });

  scrollToTop = () => window.scrollTo(0, 0);

  render() {
    const { data } = this.props;
    const { filter } = this.state;
    const characters = getCharacters(data);
    const matches = getFilteredCharacters(characters, filter);

    return (
      <section className="Master">
        <div className="Master-controls">
          <Input
            placeholder="Filter characters..."
            value={filter}
            onChange={this.handleFilterChange}
          />
        </div>
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
              <p>No characters match the filter {filter}.</p>
              <Button onClick={this.clearFilter}>Clear</Button>
            </Panel>
          )}
        </ul>
        <div className="Master-top">
          <Button onClick={this.scrollToTop}>Top</Button>
        </div>
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
