import React, { Component } from "react";
import { Button, Icon, Item } from "semantic-ui-react";

import { CharacterSelect, Layout } from "../components";
import smashball from "../img/smashball.png";
import * as styles from "../styles";

export default class IndexPage extends Component {
  componentDidMount() {
    // Progressive Web App
    window.addEventListener("beforeinstallprompt", e => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();

      this.installApp = e.prompt;
    });
  }

  installApp = () =>
    console.info(
      `Attempted to install app, but "beforeinstallprompt" has not yet fired.`
    );

  render() {
    const isPwa =
      typeof window !== "undefined" &&
      window.matchMedia("(display-mode: standalone)").matches;

    return (
      <Layout>
        <Item.Group relaxed="very">
          <Item
            style={{
              background: "#1B1C1C"
            }}
          >
            <Item.Image size="medium" src={smashball} />
            <Item.Content
              verticalAlign="bottom"
              style={{
                padding: "2rem"
              }}
            >
              <Item.Header
                as="h1"
                style={{
                  ...styles.fancyText,
                  fontSize: "2rem"
                }}
                content="Attributes and combos for all members of the Smash Ultimate cast"
              />
              <Item.Description
                style={{
                  fontSize: "1.2rem"
                }}
              >
                SmashCombos is an open-source initiative with the goal of
                becoming a compendium of combos, a one-stop-shop to pick up the
                ins and outs of your favorite character, or even a character
                you're looking to add to your repertoire.
              </Item.Description>
              {!isPwa && (
                <Item.Extra>
                  <Button
                    icon
                    primary
                    size="massive"
                    floated="right"
                    onClick={() => this.installApp()}
                    style={{
                      marginTop: "2rem"
                    }}
                  >
                    <Icon name="mobile" /> Download the App
                  </Button>
                </Item.Extra>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
        <CharacterSelect />
      </Layout>
    );
  }
}
