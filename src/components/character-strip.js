import React from "react";
import Img from "gatsby-image";

import Panel from "./panel";
import "./character-strip.scss";

export default function CharacterStrip({
  name,
  image,
  killConfirms,
  combos,
  clickable
}) {
  console.log("\n\n\n", "killConfirms", killConfirms, "\n\n\n");
  return (
    <section className={`CharacterStrip ${clickable && "clickable"}`}>
      <div className="CharacterStrip-image">
        <Img fluid={image.childImageSharp.fluid} />
      </div>
      <div className="CharacterStrip-details">
        <h2 className="CharacterStrip-details-name">{name}</h2>
        <div className="CharacterStrip-details-stats">
          <Panel className="CharacterStrip-details-stats-shouter">
            <p className="CharacterStrip-details-stats-shouter-stat">
              Kill Confirms
            </p>
            <p className="CharacterStrip-details-stats-shouter-count">
              {(killConfirms || []).length}
            </p>
          </Panel>
          <Panel className="CharacterStrip-details-stats-shouter">
            <p className="CharacterStrip-details-stats-shouter-stat">Combos</p>
            <p className="CharacterStrip-details-stats-shouter-count">
              {(combos || []).length}
            </p>
          </Panel>
        </div>
      </div>
    </section>
  );
}
