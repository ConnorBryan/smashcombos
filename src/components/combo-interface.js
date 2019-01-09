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
    confirming: false
  };

  toggleConfirming = () =>
    this.setState(prevState => ({
      confirming: !prevState.confirming
    }));

  updateCombo = combo => this.setState({ combo });

  continue = () => {
    const { onContinue } = this.props;
    const { combo } = this.state;

    onContinue(combo, this.toggleConfirming);
  };

  render() {
    const { combo, confirming } = this.state;

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
