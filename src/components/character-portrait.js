import React from "react";
import Image from "gatsby-image";
import { Label, Segment } from "semantic-ui-react";

import * as styles from "../styles";

export default function CharacterPortrait({ image, name, ...rest }) {
  const styling = {
    ...styles.noSidePadding,
    ...styles.perfectlyCentered,
    borderBottom: "none",
    background: "#222"
  };
  const imageNode = (
    <Image
      fluid={image.childImageSharp.fluid}
      style={{
        width: "20rem"
      }}
    />
  );

  return (
    <div {...rest}>
      <div className="mobile-only">
        <Segment basic style={styling}>
          {imageNode}
        </Segment>
      </div>
      <div className="desktop-only">
        <Segment attached="top" style={styling}>
          {imageNode}
        </Segment>
      </div>
      <Label
        style={{
          ...styles.fancyText,
          width: "100%",
          margin: 0,
          borderRadius: 0,
          fontSize: "2rem",
          textAlign: "center"
        }}
      >
        {name}
      </Label>
    </div>
  );
}
