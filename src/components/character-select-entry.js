import React from "react";
import { Link } from "gatsby";
import Image from "gatsby-image";
import { List } from "semantic-ui-react";

import * as styles from "../styles";
import Tagbar from "./tagbar";

export default function CharacterSelectEntry({
  name,
  render: {
    childImageSharp: { fluid: image }
  },
  slug,
  tags
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
            height: "100px"
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
        </List.Header>
      </List.Content>
      <List.Content
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap"
        }}
      >
        <Tagbar tags={tags} />
      </List.Content>
    </List.Item>
  );
}
