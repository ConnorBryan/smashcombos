import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";

export default function PlaceholderPanel({
  icon = "warning",
  action,
  children,
  basic,
  ...rest
}) {
  return (
    <Segment
      placeholder
      basic={basic}
      {...rest}
      style={{ width: "100%", height: "90%" }}
    >
      <Header icon>
        <Icon
          name={icon}
          color="purple"
          style={{
            marginBottom: "1rem"
          }}
        />
        {children}
      </Header>
    </Segment>
  );
}
