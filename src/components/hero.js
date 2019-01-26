import React from "react";
import { Item } from "semantic-ui-react";

import * as styles from "../styles";

export default function Hero({ image, header, description, children }) {
  return (
    <Item.Group relaxed="very">
      <Item
        style={{
          padding: "2rem",
          background: "#1B1C1C"
        }}
      >
        <Item.Image size="left" src={image} />
        <Item.Content verticalAlign="middle">
          <Item.Header
            as="h1"
            style={{
              ...styles.fancyText,
              fontSize: "2rem"
            }}
            content={header}
          />
          <Item.Description
            style={{
              fontSize: "1.2rem"
            }}
          >
            {description}
          </Item.Description>
          {children}
        </Item.Content>
      </Item>
    </Item.Group>
  );
}
