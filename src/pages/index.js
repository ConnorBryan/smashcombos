import React from "react";
import { Link } from "gatsby";
import { Button, Icon, Item } from "semantic-ui-react";

import { CharacterSelect, Hero } from "../components";
import { Layout } from "../modules";
import smashball from "../img/smashball.png";

export default function IndexPage({ navigate }) {
  const isPwa =
    typeof window !== "undefined" &&
    window.matchMedia("(display-mode: standalone)").matches;

  return (
    <Layout navigate={navigate}>
      <Hero
        image={smashball}
        header="Attributes and combos for all members of the Smash Ultimate cast"
        description="SmashCombos is an open-source initiative with the goal of becoming
        a compendium of combos, a one-stop-shop to pick up the ins and
        outs of your favorite character, or even a character you're
        looking to add to your repertoire."
      >
        {!isPwa && (
          <Item.Extra>
            <Button
              as={Link}
              to="/download-app"
              icon
              primary
              size="massive"
              floated="right"
              style={{
                marginTop: "2rem"
              }}
            >
              <Icon name="mobile" /> Download the App
            </Button>
          </Item.Extra>
        )}
      </Hero>
      <CharacterSelect />
    </Layout>
  );
}
