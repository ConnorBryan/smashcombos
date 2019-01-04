import React, { Component } from "react";
import { Button, Header, Segment } from "semantic-ui-react";

import * as styles from "../styles";
import { ComboCreator } from "../modules";
import ComboListEntry from "./combo-list-entry";

export default class AddComboTab extends Component {
  state = {
    combo: {
      input: "",
      damage: "",
      tags: [],
      percentages: {
        balloonweight: "",
        featherweight: "",
        lightweight: "",
        middleweight: "",
        heavyweight: "",
        superheavyweight: ""
      },
      demonstration: "",
      notes: ""
    },
    confirming: false
  };

  toggleConfirming = () =>
    this.setState(prevState => ({
      confirming: !prevState.confirming
    }));

  updateCombo = combo => this.setState({ combo });

  continue = () => {
    // Pass
  };

  render() {
    const { combo, confirming } = this.state;

    return confirming ? (
      <Segment basic>
        <Segment>
          <Header as="h2" style={styles.fancyText}>
            Verify combo
          </Header>
          <p>
            Does this look good? If so, press "Continue" below. If not, press
            "Make changes" to update the combo.
          </p>
          <Button.Group>
            <Button onClick={this.toggleConfirming}>Make changes</Button>
            <Button onClick={this.continue} primary>
              Continue
            </Button>
          </Button.Group>
        </Segment>
        <ComboListEntry basic {...combo} />
      </Segment>
    ) : (
      <ComboCreator
        {...combo}
        onSubmit={values => {
          this.updateCombo(values);
          this.toggleConfirming();
        }}
      />
    );
  }
}
