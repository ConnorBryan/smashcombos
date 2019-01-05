import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";

import * as styles from "../styles";

export default function ConfirmChanges({
  title,
  children,
  onMakeChanges,
  onContinue
}) {
  return (
    <Segment basic>
      <Segment>
        <Header as="h2" style={styles.fancyText}>
          Verify {title}
        </Header>
        <p>
          Does this look good? If so, press "Continue" below. If not, press
          "Make changes" to update the combo.
        </p>
        <Button.Group>
          <Button onClick={onMakeChanges}>Make changes</Button>
          <Button onClick={onContinue} primary>
            Continue
          </Button>
        </Button.Group>
      </Segment>
      {children}
    </Segment>
  );
}
