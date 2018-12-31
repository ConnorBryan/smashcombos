import React from "react";
import { Segment, Header } from "semantic-ui-react";

import * as styles from "../styles";
import PlaceholderPanel from "./placeholder-panel";
import ComboListEntry from "./combo-list-entry";

export default function ComboList({ combos }) {
  return (
    <Segment attached basic>
      <Header as="h2" style={{ ...styles.fancyText, color: "#7289D8" }}>
        Combos
      </Header>
      {combos.length > 0 ? (
        combos.map((combo, index) => (
          <ComboListEntry
            key={combo.input}
            {...combo}
            total={combos.length - 1}
            index={index}
          />
        ))
      ) : (
        <PlaceholderPanel icon="plus" action="Add a combo">
          This character doesn't have any listed combos.
        </PlaceholderPanel>
      )}
    </Segment>
  );
}
