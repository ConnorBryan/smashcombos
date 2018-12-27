import React, { Component } from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import { getCharacter, getCharacterRender, weightClassToTag } from "../helpers";
import downRightArrow from "../img/down-right-arrow.svg";
import {
  Button,
  CharacterCard,
  Grouping,
  Layout,
  Panel,
  Tagbar,
  Tag,
  Value
} from "../components";
import "./character-page.scss";

const DescriptionModes = {
  Description: "Description",
  Attributes: "Attributes"
};

export default class CharacterPage extends Component {
  state = {
    descriptionMode: DescriptionModes.Description
  };

  switchDescriptionMode = descriptionMode => this.setState({ descriptionMode });

  render() {
    const { data } = this.props;
    const { descriptionMode } = this.state;
    const character = getCharacter(data);
    const image = getCharacterRender(character);
    const {
      name,
      attributes: {
        weight: { class: weightClass }
      },
      killConfirms,
      combos
    } = character;

    return (
      <Layout>
        <section className="CharacterPage">
          <div className="CharacterPage-profileWrapper">
            <div className="CharacterPage-profile">
              <Img
                className="CharacterCard-profile-image"
                fluid={image.childImageSharp.fluid}
              />
              <div className="CharacterPage-profile-name">{name}</div>
            </div>
            <div className="CharacterPage-description">
              <ul className="CharacterPage-description-labels">
                <li
                  className={`${descriptionMode ===
                    DescriptionModes.Description && "active"}`}
                  onClick={() =>
                    this.switchDescriptionMode(DescriptionModes.Description)
                  }
                >
                  Description
                </li>
                <li
                  className={`${descriptionMode ===
                    DescriptionModes.Attributes && "active"}`}
                  onClick={() =>
                    this.switchDescriptionMode(DescriptionModes.Attributes)
                  }
                >
                  Attributes
                </li>
              </ul>
              <div className="CharacterPage-description-content">
                {descriptionMode === DescriptionModes.Description && (
                  <React.Fragment>123</React.Fragment>
                )}
                {descriptionMode === DescriptionModes.Attributes && (
                  <section className="CharacterPage-description-content-lists">
                    <section>
                      <section className="DescriptionList">
                        <h2>Air Acceleration</h2>
                        <dl>
                          <dt>Rank</dt>
                          <dd>1</dd>
                          <dt>Max Additional</dt>
                          <dd>0.08</dd>
                          <dt>Base Value</dt>
                          <dd>0.05</dd>
                          <dt>Total</dt>
                          <dd>0.13</dd>
                        </dl>
                      </section>
                      <section className="DescriptionList">
                        <h2>Air Speed</h2>
                        <dl>
                          <dt>Rank</dt>
                          <dd>1</dd>
                          <dt>Max Air Speed</dt>
                          <dd>1.344</dd>
                        </dl>
                      </section>
                    </section>
                    <section>
                      <section className="DescriptionList">
                        <h2>Fall Speed</h2>
                        <dl>
                          <dt>Rank</dt>
                          <dd>1</dd>
                          <dt>Max Fall Speed</dt>
                          <dd>2.1</dd>
                          <dt>Fast Fall Speed</dt>
                          <dd>3.36</dd>
                          <dt>Speed Increase</dt>
                          <dd>60%</dd>
                        </dl>
                      </section>
                      <section className="DescriptionList">
                        <h2>Run Speed</h2>
                        <dl>
                          <dt>Rank</dt>
                          <dd>1</dd>
                          <dt>Max Run Speed</dt>
                          <dd>3.85</dd>
                        </dl>
                      </section>
                    </section>
                    <section>
                      <section className="DescriptionList">
                        <h2>Walk Speed</h2>
                        <dl>
                          <dt>Rank</dt>
                          <dd>1</dd>
                          <dt>Max Walk Speed</dt>
                          <dd>1.575</dd>
                        </dl>
                      </section>
                      <section className="DescriptionList">
                        <h2>Weight</h2>
                        <dl>
                          <dt>Rank</dt>
                          <dd>1</dd>
                          <dt>Value</dt>
                          <dd>135</dd>
                        </dl>
                      </section>
                    </section>
                  </section>
                )}
              </div>
            </div>
          </div>
          <div className="CharacterPage-section">
            <div className="CharacterPage-tags">
              <Tagbar>
                <Tag>{weightClassToTag[weightClass]}</Tag>
              </Tagbar>
            </div>
          </div>
        </section>
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
