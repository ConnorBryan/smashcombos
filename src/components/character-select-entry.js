import React from "react";
import { Link } from "gatsby";
import { List } from "semantic-ui-react";

import * as styles from "../styles";

export default function CharacterSelectEntry({
  name,
  render: {
    childImageSharp: { fluid: image }
  },
  slug,
  comboCount
}) {
  const content = (
    <>
      {name}
      <br />{" "}
      <span
        style={{
          ...styles.fancyPanel,
          fontSize: "16px",
          color: "#738BD6"
        }}
      >
        {comboCount} {comboCount === 1 ? "Combo" : "Combos"}
      </span>
    </>
  );

  return (
    <List.Item
      as={Link}
      to={slug}
      verticalAlign="bottom"
      style={{
        flexDirection: "column",
        backgroundImage: `url(${image.src})`,
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Mobile */}
      <List.Content
        className="mobile-only"
        style={{
          position: "relative",
          minHeight: "180px",
          padding: "1rem"
        }}
      >
        <List.Header
          as="h3"
          style={{
            ...styles.fancyText,
            position: "absolute",
            right: 0,
            bottom: 0,
            textAlign: "right"
          }}
        >
          {content}
        </List.Header>
      </List.Content>
      {/* Desktop */}
      <List.Content
        className="desktop-only"
        style={{
          minHeight: "180px",
          padding: "1rem"
        }}
      >
        <List.Header
          as="h2"
          style={{
            ...styles.fancyText,
            textAlign: "right"
          }}
        >
          {content}
        </List.Header>
      </List.Content>
    </List.Item>
  );
}
