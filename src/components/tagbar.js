import React from "react";
import { Label, List } from "semantic-ui-react";

import { tagTypeToTag } from "../helpers";
import * as styles from "../styles";

export default function Tagbar({ tags }) {
  return (
    <List horizontal>
      <List.Item>
        <List.Header as="h3" style={styles.fancyText}>
          Tags
        </List.Header>
      </List.Item>
      {(tags || []).map(tag => (
        <List.Item key={tag}>
          <Label>{tagTypeToTag[tag] || tag}</Label>
        </List.Item>
      ))}
    </List>
  );
}
