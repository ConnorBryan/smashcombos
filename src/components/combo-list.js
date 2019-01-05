import React from "react";
import { Link } from "gatsby";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

import * as styles from "../styles";
import PlaceholderPanel from "./placeholder-panel";
import ComboListEntry from "./combo-list-entry";

export default function ComboList({ slug, combos }) {
  const content = (
    <React.Fragment>
      <Header as="h2" style={{ ...styles.fancyText, color: "#7289D8" }}>
        Combos
      </Header>
      {combos.length > 0 ? (
        combos.map((combo, index) => (
          <ComboListEntry
            key={combo.input}
            {...combo}
            slug={slug}
            total={combos.length - 1}
            index={index}
          />
        ))
      ) : (
        <PlaceholderPanel icon="plus" basic>
          This character doesn't have any listed combos.
        </PlaceholderPanel>
      )}
    </React.Fragment>
  );
  const button = (
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
  );

  return (
    <React.Fragment>
      <div className="mobile-only">
        <Segment basic>{content}</Segment>
        {button}
      </div>
      <div className="desktop-only">
        <Segment attached>{content}</Segment>
        {button}
      </div>
    </React.Fragment>
  );
}
