import React, { Component } from "react";
import { Formik, Field } from "formik";
import {
  Button,
  Form,
  Header,
  Icon,
  List,
  Menu,
  Segment,
  Sidebar
} from "semantic-ui-react";

import * as styles from "../../../styles";
import { moveTypes, modifierTypes } from "../constants";

export const transformMoveType = moveType => moveType.split(" ").join("");

export const SidebarScreens = {
  MoveOrModifier: 1,
  Moves: 2,
  GroundAttacks: 3,
  TiltAttacks: 4,
  SmashAttacks: 5,
  AerialAttacks: 6,
  Throws: 7,
  SpecialMoves: 8,
  Modifiers: 9,
  Custom: 10
};

export const sidebarScreenComponents = {
  [SidebarScreens.MoveOrModifier]: ({ switchSidebarScreen }) => (
    <>
      <Menu.Item onClick={() => switchSidebarScreen(SidebarScreens.Moves)}>
        <Menu.Header content="Moves" style={styles.fancyText} />
        Ground attacks, aerials, tilts, smashes, specials and grabs.
      </Menu.Item>
      <Menu.Item onClick={() => switchSidebarScreen(SidebarScreens.Modifiers)}>
        <Menu.Header content="Modifiers" style={styles.fancyText} />
        Techniques that detail how moves should be performed.
      </Menu.Item>
      <Menu.Item onClick={() => switchSidebarScreen(SidebarScreens.Custom)}>
        <Menu.Header content="Custom" style={styles.fancyText} />
        Character-specific input for moves or modifiers not listed above.
      </Menu.Item>
    </>
  ),
  [SidebarScreens.Moves]: ({ switchSidebarScreen }) =>
    Object.keys(moveTypes).map(moveType => (
      <Menu.Item
        key={moveType}
        onClick={() =>
          switchSidebarScreen(SidebarScreens[transformMoveType(moveType)])
        }
      >
        <Menu.Header content={moveType} style={styles.fancyText} />
      </Menu.Item>
    )),
  ...Object.entries(moveTypes).reduce((prev, [key, value]) => {
    prev[SidebarScreens[transformMoveType(key)]] = ({ addInput }) =>
      value.map(({ name, term }) => (
        <Menu.Item key={term} onClick={() => addInput(term)}>
          <Menu.Header style={styles.fancyText}>{name}</Menu.Header>
        </Menu.Item>
      ));

    return prev;
  }, {}),
  [SidebarScreens.Modifiers]: ({ addModifier }) =>
    modifierTypes.map(({ name, term }) => (
      <Menu.Item key={term} onClick={() => addModifier(term)}>
        <Menu.Header style={styles.fancyText}>{name}</Menu.Header>
      </Menu.Item>
    )),
  [SidebarScreens.Custom]: ({ addInput }) => (
    <Menu.Item>
      <Menu.Header style={styles.fancyText}>Custom Input</Menu.Header>
      If there's a specialized input or modifier that's not in either Moves or
      Modifiers, enter it below.
      <Formik
        initialValues={{
          input: ""
        }}
        onSubmit={({ input }) => addInput(input.toLowerCase())}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="input"
              render={({ field }) => (
                <Form.Input
                  {...field}
                  style={{
                    marginTop: "14px",
                    marginBottom: 0
                  }}
                />
              )}
            />
            <Button
              icon
              primary
              fluid
              type="submit"
              style={{
                flex: 1
              }}
            >
              <Icon name="plus" /> Add
            </Button>
          </Form>
        )}
      />
    </Menu.Item>
  )
};

export class InputScreen extends Component {
  state = {
    input: [],
    modifiers: [],
    sidebarScreen: null,
    history: []
  };

  addToHistory = sidebarScreen =>
    this.setState(prevState => ({
      history: prevState.history.concat(sidebarScreen)
    }));

  clearHistory = () => this.setState({ history: [] });

  goBack = () => {
    const { history } = this.state;
    const mutableHistory = [...history];

    mutableHistory.pop();

    this.switchSidebarScreen(mutableHistory.slice(-1)[0]);
    this.setState({ history: mutableHistory });
  };

  switchSidebarScreen = sidebarScreen => {
    this.addToHistory(sidebarScreen);
    this.setState({ sidebarScreen });
  };

  closeSidebar = () => {
    this.clearHistory();
    this.setState({ sidebarScreen: null });
  };

  addInput = input => {
    const { modifiers } = this.state;
    const fullInput =
      modifiers.length > 0 ? `${modifiers.join("+")}+${input}` : input;

    this.setState(prevState => ({
      input: prevState.input.concat(fullInput)
    }));
    this.clearModifiers();
  };

  clearInput = offset =>
    this.setState(prevState => ({
      input: prevState.input.filter((_, index) => index !== offset)
    }));

  addModifier = modifier => {
    this.setState(prevState => ({
      modifiers: prevState.modifiers.concat(modifier)
    }));
  };

  clearModifiers = () =>
    this.setState({
      modifiers: []
    });

  continue = () => {
    const { onNext, onSubmit } = this.props;
    const { input } = this.state;

    onSubmit({ input });
    onNext();
  };

  render() {
    const { input, modifiers, sidebarScreen } = this.state;
    const SidebarScreen = sidebarScreenComponents[sidebarScreen];

    return (
      <Sidebar.Pushable as={Segment} basic style={{ minHeight: "60vh" }}>
        <Sidebar.Pusher>
          <Header as="h2" content="Input" style={styles.fancyText} />
          <p
            style={{
              ...styles.fancyPanel,
              fontSize: "1.4rem"
            }}
          >
            Enter a combination of moves and modifiers required to execute the
            string.
          </p>
          <List style={{ fontSize: "1.5rem" }}>
            {input.map((entry, index) => (
              <List.Item key={index}>
                {index > 0 && <List.Icon name="arrow right" />}
                <List.Content>
                  {entry}
                  <Button
                    icon="close"
                    secondary
                    floated="right"
                    onClick={() => this.clearInput(index)}
                  />
                </List.Content>
              </List.Item>
            ))}
            {modifiers.length > 0 && (
              <List.Item>
                {input.length > 0 && <List.Icon name="arrow right" />}
                <List.Content>
                  {modifiers.join("+")}+
                  <Button
                    icon="close"
                    secondary
                    floated="right"
                    onClick={this.clearModifiers}
                  />
                </List.Content>
              </List.Item>
            )}
          </List>
          <Button
            icon
            fluid
            size="huge"
            onClick={() =>
              sidebarScreen
                ? this.closeSidebar()
                : this.switchSidebarScreen(SidebarScreens.MoveOrModifier)
            }
            style={{
              ...styles.fancyText,
              marginBottom: "1rem"
            }}
          >
            <Icon name="plus" /> Add move / modifier
          </Button>
          <Button
            primary
            icon
            fluid
            size="huge"
            onClick={this.continue}
            disabled={input.length === 0}
            style={styles.fancyText}
          >
            <Icon name="arrow alternate circle right outline" /> Continue
          </Button>
        </Sidebar.Pusher>
        <Sidebar
          as={Menu}
          animation="overlay"
          vertical
          visible={Boolean(sidebarScreen)}
          direction="right"
          inverted
        >
          {sidebarScreen > SidebarScreens.MoveOrModifier && (
            <Menu.Item onClick={this.goBack}>
              <Icon name="arrow circle left" />
              <Menu.Header content="Back" style={styles.fancyText} />
            </Menu.Item>
          )}
          {sidebarScreen && (
            <>
              <SidebarScreen
                addInput={this.addInput}
                addModifier={this.addModifier}
                switchSidebarScreen={this.switchSidebarScreen}
              />
              <Menu.Item onClick={this.closeSidebar}>
                <Icon name="close" />
                <Menu.Header content="Close" style={styles.fancyText} />
              </Menu.Item>
            </>
          )}
        </Sidebar>
      </Sidebar.Pushable>
    );
  }
}

export default InputScreen;
