import React from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-less/semantic.less";

import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Navbar />
      <Container
        style={{
          marginTop: "7rem"
        }}
      >
        {children}
      </Container>
    </React.Fragment>
  );
}
