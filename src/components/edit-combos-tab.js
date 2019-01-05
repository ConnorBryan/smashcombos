import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import { ComboCreator } from "../modules";
import ComboListEntry from "./combo-list-entry";
import ConfirmChanges from "./confirm-changes";
import Input from "./input";
import PlaceholderPanel from "./placeholder-panel";

export default class EditCombosTab extends Component {
  state = {
    editing: null,
    confirming: false
  };

  editCombo = combo =>
    this.setState({
      editing: combo
    });

  stopEditingCombo = () => this.setState({ editing: null, confirming: false });

  toggleConfirming = () =>
    this.setState(prevState => ({
      confirming: !prevState.confirming
    }));

  continue = () => {
    // Pass
  };

  render() {
    const { combos } = this.props;
    const { confirming, editing } = this.state;

    return (
      <React.Fragment>
        {editing ? (
          <React.Fragment>
            <Button onClick={this.stopEditingCombo}>Cancel</Button>
            {confirming ? (
              <ConfirmChanges
                title="combo"
                onMakeChanges={this.toggleConfirming}
                onContinue={this.continue}
              >
                <ComboListEntry basic {...editing} />
              </ConfirmChanges>
            ) : (
              <ComboCreator
                {...editing}
                onSubmit={values => {
                  this.editCombo(values);
                  this.toggleConfirming();
                }}
              />
            )}
          </React.Fragment>
        ) : combos.length > 0 ? (
          combos.map(combo => (
            <Button key={combo.input} onClick={() => this.editCombo(combo)}>
              <Input input={combo.input} />
            </Button>
          ))
        ) : (
          <PlaceholderPanel icon="plus" basic>
            This character doesn't have any listed combos.
          </PlaceholderPanel>
        )}
      </React.Fragment>
    );
  }
}
