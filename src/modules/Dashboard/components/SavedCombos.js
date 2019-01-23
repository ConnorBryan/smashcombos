import React from "react";
import { Header, Segment } from "semantic-ui-react";

import SectionHeader from "./SectionHeader";

export default function SavedCombos() {
  return (
    <>
      <SectionHeader
        header="Saved Combos"
        description="A list of combos that you have designated for easy access."
      />
      <Segment placeholder textAlign="center">
        <Header as="h2" content="Coming soon." />
      </Segment>
    </>
  );
}
