import React, { Component } from "react";
import { Dropdown, Grid, Header, Menu, Segment } from "semantic-ui-react";

import { Input } from "../../../components";
import * as styles from "../../../styles";
import { attackTypes, attackModifiers } from "../constants";

export default class InputScreen extends Component {
  state = {
    input: this.props.input,
    modifiers: ""
  };

  componentDidUpdate(_, { input: prevInput }) {
    const { update } = this.props;
    const { input } = this.state;

    if (input !== prevInput) {
      update(input);
    }
  }

  addMove = (_, { value }) =>
    this.setState(prevState => ({
      input:
        prevState.input.length === 0
          ? value
          : `${prevState.input} ${prevState.modifiers}${value}`,
      modifiers: ""
    }));

  addModifier = (_, { value }) =>
    this.state.input.length > 0 &&
    this.setState(prevState => ({
      modifiers:
        prevState.modifiers.length === 0
          ? `${value}+`
          : `${prevState.modifiers}${value}+`
    }));

  clearModifiers = () => this.setState({ modifiers: "" });

  clearLastMove = () =>
    this.setState(prevState => {
      const { input, modifiers } = prevState;
      const inputArray = input.split(" ");

      return {
        input: inputArray
          .filter((_, index) => index !== inputArray.length - 1)
          .join(" "),
        modifiers: inputArray.length === 1 ? "" : modifiers
      };
    });

  clearAllMoves = () => this.setState({ input: "", modifiers: "" });

  render() {
    const { input, modifiers } = this.state;
    const actions = (
      <Menu vertical fluid attached>
        <Menu.Item style={styles.fancyText} onClick={this.clearModifiers}>
          Clear modifiers
        </Menu.Item>
        <Menu.Item style={styles.fancyText} onClick={this.clearLastMove}>
          Clear last move
        </Menu.Item>
        <Menu.Item style={styles.fancyText} onClick={this.clearAllMoves}>
          Clear all moves
        </Menu.Item>
      </Menu>
    );
    const menuColumn = (
      <React.Fragment>
        <Segment
          attached
          style={{
            padding: 0
          }}
        >
          <Dropdown
            text="Modifiers"
            fluid
            labeled
            selectOnBlur={false}
            onChange={this.addModifier}
            options={attackModifiers.map(({ name, term }) => ({
              key: name,
              text: name,
              value: term,
              selected: false
            }))}
            style={{
              ...styles.fancyText,
              padding: "14px"
            }}
          />
        </Segment>
        <Segment attached>
          <Header as="h5" style={styles.fancyText} content="Active modifiers" />
          <div
            style={{
              height: "4rem",
              fontSize: "1.5rem",
              whiteSpace: "nowrap",
              overflowX: "auto"
            }}
          >
            {modifiers}
          </div>
        </Segment>
        {Object.entries(attackTypes).map(([key, value]) => (
          <Segment
            key={key}
            attached
            style={{
              padding: 0
            }}
          >
            <Dropdown
              text={key}
              fluid
              labeled
              selectOnBlur={false}
              onChange={this.addMove}
              options={value.map(({ name, term }) => ({
                key: name,
                text: name,
                value: term,
                selected: false
              }))}
              style={{
                ...styles.fancyText,
                padding: "14px"
              }}
            />
          </Segment>
        ))}
        <div className="mobile-only">{actions}</div>
      </React.Fragment>
    );

    return (
      <Grid
        style={{
          marginBottom: "3rem"
        }}
      >
        <Grid.Column className="desktop-only" tablet={16} computer={8}>
          {menuColumn}
        </Grid.Column>
        <Grid.Column mobile={16} tablet={16} computer={8}>
          <Segment
            attached="top"
            style={{
              height: "20rem",
              overflowY: "auto"
            }}
          >
            <Input input={input} />
          </Segment>
          <div className="desktop-only">{actions}</div>
        </Grid.Column>
        <Grid.Column className="mobile-only" mobile={16}>
          {menuColumn}
        </Grid.Column>
      </Grid>
    );
  }
}
