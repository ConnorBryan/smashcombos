import React from "react";
import { Header, Segment } from "semantic-ui-react";

import SectionHeader from "./SectionHeader";

export default function SavedCharacters() {
  return (
    <>
      <SectionHeader
        header="Saved Characters"
        description="Characters you have taken a particular interest in."
      />
      <Segment placeholder textAlign="center">
        <Header as="h2" content="Coming soon." />
      </Segment>
    </>
  );
}
