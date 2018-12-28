import React from "react";
import { Segment, Header, Icon, Button } from "semantic-ui-react";

export default function ComboDemonstrationPlaceholder() {
  return (
    <Segment placeholder style={{ width: "100%", height: "90%" }}>
      <Header icon>
        <Icon name="warning" />
        This combo does not have a demonstration.
        <Button
          size="large"
          primary
          style={{
            marginTop: "2rem"
          }}
        >
          Upload demonstration
        </Button>
      </Header>
    </Segment>
  );
}
