import React from "react";
import Img from "gatsby-image";

import { weightClassToTag } from "../helpers";
import Panel from "./panel";
import Tag from "./tag";
import "./character-strip.scss";

export default function CharacterStrip({
  name,
  image,
  attributes: {
    weight: { class: weightClass }
  },
  killConfirms,
  combos,
  tags = [],
  clickable
}) {
  return (
    <section className={`CharacterStrip ${clickable && "clickable"}`}>
      <div className="CharacterStrip-top">
        <div className="CharacterStrip-top-image">
          <Img fluid={image.childImageSharp.fluid} />
        </div>
        <div className="CharacterStrip-top-details">
          <div className="CharacterStrip-top-details-name">
            <h2>{name}</h2>
          </div>
          <div className="CharacterStrip-top-details-stats">
            <Panel className="CharacterStrip-top-details-stats-shouter">
              <p className="CharacterStrip-top-details-stats-shouter-stat">
                Kill Confirms
              </p>
              <p className="CharacterStrip-top-details-stats-shouter-count">
                {(killConfirms || []).length}
              </p>
            </Panel>
            <Panel className="CharacterStrip-top-details-stats-shouter">
              <p className="CharacterStrip-top-details-stats-shouter-stat">
                Combos
              </p>
              <p className="CharacterStrip-top-details-stats-shouter-count">
                {(combos || []).length}
              </p>
            </Panel>
          </div>
        </div>
      </div>
      <div className="CharacterStrip-bottom">
        <div className="CharacterStrip-bottom-label">Tags</div>
        <div className="CharacterStrip-bottom-tags">
          <Tag>{weightClassToTag[weightClass]}</Tag>
        </div>
      </div>
    </section>
  );
}
