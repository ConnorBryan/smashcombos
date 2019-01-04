import React, { Component } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";

import * as styles from "../../styles";
import { InputScreen } from "./components";
import { comboTags, comboPercentages } from "./constants";

export default class ComboCreator extends Component {
  state = {
    input: "",
    damage: "",
    tags: comboTags.reduce((prev, { value }) => {
      prev[value] = false;
      return prev;
    }, {}),
    percentages: comboPercentages.reduce((prev, { value }) => {
      prev[value] = "";
      return prev;
    }, {}),
    demonstration: "",
    notes: ""
  };

  updateInput = input => this.setState({ input });

  updateDamage = (_, { value: damage }) => this.setState({ damage });

  updateTags = tag => (_, { checked }) =>
    this.setState(prevState => ({
      tags: {
        ...prevState.tags,
        [tag]: checked
      }
    }));

  updatePercentages = weightClass => (_, { value: percentage }) =>
    this.setState(prevState => ({
      percentages: {
        ...prevState.percentages,
        [weightClass]: percentage
      }
    }));

  updateDemonstration = (_, { value: demonstration }) =>
    this.setState({ demonstration });

  updateNotes = (_, { value: notes }) => this.setState({ notes });

  render() {
    const {
      input,
      damage,
      tags,
      percentages,
      demonstration,
      notes
    } = this.state;

    return (
      <Segment basic>
        <InputScreen input={input} update={this.updateInput} />
        <Form>
          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Form.Input
                required
                label="Damage"
                icon="percent"
                value={damage}
                onChange={this.updateDamage}
                tabIndex={1}
                style={{
                  maxWidth: "10rem"
                }}
              />
              <Form.Group grouped>
                <label>Tags</label>
                {comboTags.map(({ label, value }, index) => (
                  <Form.Checkbox
                    key={label}
                    label={label}
                    checked={tags[value]}
                    onChange={this.updateTags(value)}
                    tabIndex={index + 2}
                  />
                ))}
              </Form.Group>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={6}>
              <Form.Group grouped>
                <label>Percentages</label>
                <div
                  style={{
                    ...styles.fancyPanel,
                    display: "flex",
                    marginTop: "0.5rem"
                  }}
                >
                  <div style={{ marginRight: "1rem" }}>
                    {comboPercentages.map(
                      ({ label, value }, index) =>
                        index < 3 && (
                          <Form.Input
                            required
                            key={label}
                            label={label}
                            icon="percent"
                            value={percentages[value]}
                            onChange={this.updatePercentages(value)}
                            tabIndex={1 + comboTags.length + index + 1}
                            style={{
                              maxWidth: "10rem",
                              marginBottom: index !== 2 ? "1rem" : 0
                            }}
                          />
                        )
                    )}
                  </div>
                  <div>
                    {comboPercentages.map(
                      ({ label, value }, index) =>
                        index > 2 && (
                          <Form.Input
                            required
                            key={label}
                            label={label}
                            icon="percent"
                            value={percentages[value]}
                            onChange={this.updatePercentages(value)}
                            tabIndex={1 + comboTags.length + index + 3}
                            style={{
                              maxWidth: "10rem",
                              marginBottom: index !== 5 ? "1rem" : 0
                            }}
                          />
                        )
                    )}
                  </div>
                </div>
              </Form.Group>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={6}>
              <Form.Input
                label="Demonstration"
                icon="video"
                value={demonstration}
                onChange={this.updateDemonstration}
                tabIndex={1 + comboTags.length + comboPercentages.length + 2}
                style={{
                  maxWidth: "20rem"
                }}
              />
              <Form.TextArea
                label="Notes"
                value={notes}
                onChange={this.updateNotes}
                tabIndex={1 + comboTags.length + comboPercentages.length + 3}
                style={{
                  maxWidth: "450px"
                }}
              />
              <Form.Field>
                <Button.Group
                  widths={2}
                  style={{
                    alignSelf: "flex-end"
                  }}
                >
                  <Button>Reset</Button>
                  <Button primary>Send</Button>
                </Button.Group>
              </Form.Field>
            </Grid.Column>
          </Grid>
        </Form>
      </Segment>
    );
  }
}
