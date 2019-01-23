import React from "react";
import { Header, Segment } from "semantic-ui-react";

import * as styles from "../../../styles";

export default function SectionHeader({ header, description }) {
  return (
    <Segment basic>
      <Header as="h2" content={header} style={styles.fancyText} />
      <p style={styles.fancyPanel}>{description}</p>
    </Segment>
  );
}
