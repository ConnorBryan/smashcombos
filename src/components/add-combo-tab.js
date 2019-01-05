import React, { Component } from "react";

import { ComboCreator } from "../modules";
import ComboListEntry from "./combo-list-entry";
import ConfirmChanges from "./confirm-changes";

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
      <ConfirmChanges
        title="combo"
        onMakeChanges={this.toggleConfirming}
        onContinue={this.continue}
      >
        <ComboListEntry basic {...combo} />
      </ConfirmChanges>
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
