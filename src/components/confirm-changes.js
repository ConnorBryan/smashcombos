import React from "react";
import { Button, Grid, Header, Segment } from "semantic-ui-react";

import * as styles from "../styles";

export default function ConfirmChanges({
  title,
  children,
  onMakeChanges,
  onContinue,
  horizontal,
  submitting
}) {
  return (
    <Segment basic>
      <Grid>
        <Grid.Column mobile={16} tablet={16} computer={horizontal ? 8 : 16}>
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
              <Button
                onClick={onContinue}
                primary
                disabled={submitting}
                loading={submitting}
              >
                Continue
              </Button>
            </Button.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={horizontal ? 8 : 16}>
          {children}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
