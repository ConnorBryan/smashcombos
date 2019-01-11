import React, { Component } from "react";
import { Card } from "semantic-ui-react";

import { ComboCreator } from "../modules";
import ComboListCard from "./combo-list-card";
import ConfirmChanges from "./confirm-changes";

export default class ComboInterface extends Component {
  state = {
    combo: this.props.combo || {
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
    confirming: false,
    submitting: false
  };

  toggleConfirming = () =>
    this.setState(prevState => ({
      confirming: !prevState.confirming
    }));

  toggleSubmitting = () =>
    this.setState(prevState => ({
      submitting: !prevState.submitting
    }));

  updateCombo = combo => this.setState({ combo });

  continue = async () => {
    const { onContinue } = this.props;
    const { combo } = this.state;

    this.toggleSubmitting();

    await onContinue(combo, this.toggleConfirming);

    this.toggleSubmitting();
  };

  render() {
    const { combo, confirming, submitting } = this.state;

    return (
      <div
        style={{
          marginBottom: "3rem"
        }}
      >
        {confirming ? (
          <ConfirmChanges
            title="combo"
            onMakeChanges={this.toggleConfirming}
            onContinue={this.continue}
            submitting={submitting}
            horizontal
          >
            <div>
              <Card.Group itemsPerRow={1}>
                <ComboListCard {...combo} />
              </Card.Group>
            </div>
          </ConfirmChanges>
        ) : (
          <ComboCreator
            {...combo}
            onSubmit={values => {
              this.updateCombo(values);
              this.toggleConfirming();
            }}
          />
        )}
      </div>
    );
  }
}
