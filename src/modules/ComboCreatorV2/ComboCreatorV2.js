import React, { Component } from "react";

import { DamageScreen, InputScreen } from "./components";

const steps = [InputScreen, DamageScreen];

export default class ComboCreator extends Component {
  state = {
    step: 0,
    string: {
      input: null,
      damage: {
        approximate: "0",
        exact: "0",
        range: ["0", "0"]
      },
      effectiveness: {
        approximate: {
          low: false,
          medium: false,
          high: false
        },
        detailed: {
          fastFall: ["0", "0"],
          regular: ["0", "0"],
          floatie: ["0", "0"]
        },
        exact: {}
      },
      threeStaters: [
        {
          type: "Kill Confirm",
          description:
            "When properly executed, does the string guarantee a kill?",
          value: "Not sure",
          additionalInformation: ""
        },
        {
          type: "True",
          description: "When properly executed, is the string inescapable?",
          value: "Not sure",
          additionalInformation: ""
        },
        {
          type: "50/50",
          description:
            "When properly executed, does the string only allow for two outcomes?",
          value: "Not sure",
          additionalInformation: ""
        },
        {
          type: "Mashable",
          description: "Is it possible to end the string by button mashing?",
          value: "Not sure",
          additionalInformation: ""
        }
      ],
      demonstration: "",
      notes: "",
      credit: ""
    }
  };

  advanceStep = () =>
    this.setState(prevState => ({
      step: Math.min(prevState.step + 1, steps.length - 1)
    }));

  regressStep = () =>
    this.setState(prevState => ({
      step: Math.min(0, prevState.step - 1)
    }));

  updateString = update =>
    this.setState(prevState => ({
      string: {
        ...prevState.string,
        ...update
      }
    }));

  render() {
    const { step, string } = this.state;
    const Step = steps[step];

    return <Step onNext={this.advanceStep} onSubmit={this.updateString} />;
  }
}
