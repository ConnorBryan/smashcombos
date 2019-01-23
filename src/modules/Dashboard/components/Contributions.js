import React from "react";
import { Header, Segment } from "semantic-ui-react";

import SectionHeader from "./SectionHeader";

export default function Contributions() {
  return (
    <>
      <SectionHeader
        header="Contributions"
        description="A list of all of the changes and additions you've made to SmashCombos."
      />
      <Segment placeholder textAlign="center">
        <Header as="h2" content="Coming soon." />
      </Segment>
    </>
  );
}
