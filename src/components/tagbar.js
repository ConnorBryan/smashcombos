import React from "react";
import { Label, List } from "semantic-ui-react";

import { tagTypeToTag } from "../constants";
import * as styles from "../styles";

export default function Tagbar({ tags, labeled = true, ...rest }) {
  return (
    <List horizontal {...rest}>
      {labeled && (
        <List.Item>
          <List.Header as="h3" style={styles.fancyText}>
            Tags
          </List.Header>
        </List.Item>
      )}
      {(tags || []).map(tag => (
        <List.Item key={tag}>
          <Label>{tagTypeToTag[tag] || tag}</Label>
        </List.Item>
      ))}
    </List>
  );
}
