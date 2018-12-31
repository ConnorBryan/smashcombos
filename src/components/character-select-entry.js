import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-image";
import { List } from "semantic-ui-react";

import * as styles from "../styles";
import { weightClassToTag } from "../helpers";
import Tagbar from "./tagbar";

export default function CharacterSelectEntry({
  name,
  render: {
    childImageSharp: { fluid: image }
  },
  attributes: {
    weight: { class: weightClass }
  },
  slug,
  tags,
  comboCount
}) {
  return (
    <List.Item
      as={Link}
      to={slug}
      style={{
        flexDirection: "column"
      }}
    >
      <List.Content
        style={{
          display: "flex",
          alignItems: "center",
          padding: "1rem"
        }}
      >
        <Image
          fluid={image}
          style={{
            width: "100px",
            height: "100px",
            marginRight: "1rem"
          }}
        />
        <List.Header
          as="h2"
          style={{
            ...styles.fancyText,
            width: "100%",
            textAlign: "right"
          }}
        >
          {name}
          <br />{" "}
          <span
            style={{
              paddingLeft: "1rem",
              borderLeft: "1px solid #738BD6",
              fontSize: "16px",
              color: "#738BD6"
            }}
          >
            {comboCount} {comboCount === 1 ? "Combo" : "Combos"}
          </span>
        </List.Header>
      </List.Content>
      <List.Content
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap"
        }}
      >
        <Tagbar tags={[weightClassToTag[weightClass], ...(tags || [])]} />
      </List.Content>
    </List.Item>
  );
}
