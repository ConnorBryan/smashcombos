import React from "react";
import { Segment, Header } from "semantic-ui-react";

import * as styles from "../styles";
import PlaceholderPanel from "./placeholder-panel";

export default function KillMovesPanel({ killMoves = [], ...rest }) {
  return (
    <Segment basic {...rest}>
      <Header as="h2" style={{ ...styles.fancyText, color: "#7289D8" }}>
        Kill Moves
      </Header>
      <Segment basic style={styles.noSidePadding}>
        {killMoves.length > 0 ? null : (
          <PlaceholderPanel icon="lightning">
            This character has no kill moves.
          </PlaceholderPanel>
        )}
      </Segment>
    </Segment>
  );
}
