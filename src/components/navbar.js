import React from "react";
import { Link } from "gatsby";
import { Container, Image, Menu } from "semantic-ui-react";

import logo from "../img/logo.svg";

export default function Navbar() {
  return (
    <Menu
      fixed="top"
      inverted
      style={{
        borderBottom: "1px solid #738BD6"
      }}
    >
      <Container>
        <Menu.Item
          as={Link}
          to="/"
          header
          style={{
            border: "none"
          }}
        >
          <Image size="small" src={logo} style={{ marginRight: "1.5em" }} />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
