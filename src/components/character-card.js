import React, { Component } from "react";
import Img from "gatsby-image";

import { weightClassToTag } from "../helpers";
import Tag from "./tag";
import Tagbar from "./tagbar";
import Value from "./value";
import "./character-card.scss";

export default class CharacterCard extends Component {
  state = {
    showingAttributes: false
  };

  render() {
    const {
      image,
      name,
      attributes: {
        weight: { class: weightClass }
      }
    } = this.props;

    return (
      <section className="CharacterCard">
        <div className="CharacterCard-profile">
          <Img
            className="CharacterCard-profile-image"
            fluid={image.childImageSharp.fluid}
          />
          <h2 className="CharacterCard-profile-name">{name}</h2>
          <div className="CharacterCard-profile-description">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <Tagbar className="CharacterCard-profile-tagbar">
            <Tag>{weightClassToTag[weightClass]}</Tag>
          </Tagbar>
        </div>
        <div className="CharacterCard-attributes">
          <div className="CharacterCard-attributes-attribute">
            <div className="CharacterCard-attributes-attribute-name">
              Air Acceleration
            </div>
            <div className="CharacterCard-attributes-attribute-values">
              <Value label="Rank" vertical={true}>
                1
              </Value>
              <Value label="Max additional" vertical={true}>
                0.08
              </Value>
              <Value label="Base value" vertical={true}>
                0.05
              </Value>
              <Value label="Total" vertical={true}>
                0.13
              </Value>
            </div>
          </div>
          <div className="CharacterCard-attributes-attribute">
            <div className="CharacterCard-attributes-attribute-name">
              Air Speed
            </div>
            <div className="CharacterCard-attributes-attribute-values">
              <Value label="Rank" vertical={true}>
                1
              </Value>
              <Value label="Max air speed" vertical={true}>
                1.344
              </Value>
            </div>
          </div>
          <div className="CharacterCard-attributes-attribute">
            <div className="CharacterCard-attributes-attribute-name">
              Fall Speed
            </div>
            <div className="CharacterCard-attributes-attribute-values">
              <Value label="Rank" vertical={true}>
                1
              </Value>
              <Value label="Max fall speed" vertical={true}>
                2.1
              </Value>
              <Value label="Fast fall speed" vertical={true}>
                3.36
              </Value>
              <Value label="Speed increase" vertical={true}>
                60%
              </Value>
            </div>
          </div>
          <div className="CharacterCard-attributes-attribute">
            <div className="CharacterCard-attributes-attribute-name">
              Run Speed
            </div>
            <div className="CharacterCard-attributes-attribute-values">
              <Value label="Rank" vertical={true}>
                1
              </Value>
              <Value label="Max run speed" vertical={true}>
                3.85
              </Value>
            </div>
          </div>
          <div className="CharacterCard-attributes-attribute">
            <div className="CharacterCard-attributes-attribute-name">
              Walk Speed
            </div>
            <div className="CharacterCard-attributes-attribute-values">
              <Value label="Rank" vertical={true}>
                1
              </Value>
              <Value label="Max walk speed" vertical={true}>
                1.575
              </Value>
            </div>
          </div>
          <div className="CharacterCard-attributes-attribute">
            <div className="CharacterCard-attributes-attribute-name">
              Weight
            </div>
            <div className="CharacterCard-attributes-attribute-values">
              <Value label="Rank" vertical={true}>
                1
              </Value>
              <Value label="Value" vertical={true}>
                135
              </Value>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
