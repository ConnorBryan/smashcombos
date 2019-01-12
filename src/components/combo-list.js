import React from "react";
import { Link } from "gatsby";
import { Button, Card, Header, Icon, Segment } from "semantic-ui-react";

import * as styles from "../styles";
import PlaceholderPanel from "./placeholder-panel";
import ComboListCard from "./combo-list-card";
import { MessageContext } from "./message-provider";

export default function ComboList({ slug, combos }) {
  return (
    <>
      <Segment basic>
        <>
          <Header
            as="h2"
            style={{
              ...styles.fancyText,
              marginBottom: 0,
              color: "#7289D8"
            }}
          >
            Combos
          </Header>
          <p
            style={{
              ...styles.fancyPanel,
              marginTop: "1rem",
              fontSize: "1.2rem"
            }}
          >
            Click on a combo below to view additional information such as
            effective percentages, a demonstration, and more.
          </p>
          {combos.length > 0 ? (
            <Card.Group
              itemsPerRow={3}
              stackable
              style={{
                marginTop: "2rem"
              }}
            >
              <MessageContext.Consumer>
                {({ showMessage }) =>
                  combos.map((combo, index) => (
                    <ComboListCard
                      key={combo.input}
                      {...combo}
                      slug={slug}
                      showMessage={showMessage}
                      basic
                    />
                  ))
                }
              </MessageContext.Consumer>
            </Card.Group>
          ) : (
            <PlaceholderPanel icon="plus" basic>
              This character doesn't have any listed combos.
            </PlaceholderPanel>
          )}
        </>
      </Segment>
      <Link to={`/${slug}/edit?tab=addCombo`}>
        <Button
          icon
          primary
          size="huge"
          attached="bottom"
          style={{
            ...styles.fancyText,
            marginBottom: "3rem"
          }}
        >
          <Icon name="plus" /> Add a combo
        </Button>
      </Link>
    </>
  );
}
