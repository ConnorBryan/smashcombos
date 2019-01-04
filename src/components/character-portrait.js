import React from "react";
import Image from "gatsby-image";
import { Label, Segment } from "semantic-ui-react";

import * as styles from "../styles";

export default function CharacterPortrait({ image, name, ...rest }) {
  return (
    <div {...rest}>
      <Segment
        attached="top"
        style={{
          ...styles.noSidePadding,
          ...styles.perfectlyCentered
        }}
      >
        <Image
          fluid={image.childImageSharp.fluid}
          style={{
            width: "20rem"
          }}
        />
      </Segment>
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
