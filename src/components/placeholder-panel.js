import React from "react";
import { Segment, Header, Icon, Button } from "semantic-ui-react";

export default function PlaceholderPanel({
  icon = "warning",
  action,
  children,
  basic,
  ...rest
}) {
  return (
    <Segment placeholder style={{ width: "100%", height: "90%" }} {...rest}>
      <Header icon>
        <Icon
          name={icon}
          color="purple"
          style={{
            marginBottom: "1rem"
          }}
        />
        {children}
        {!basic && (
          <Button
            size="large"
            primary
            style={{
              marginTop: "2rem"
            }}
          >
            {action}
          </Button>
        )}
      </Header>
    </Segment>
  );
}
