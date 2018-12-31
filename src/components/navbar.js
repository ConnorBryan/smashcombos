import React from "react";
import { Link } from "gatsby";
import { Container, Icon, Image, Menu, Responsive } from "semantic-ui-react";

import logo from "../img/logo.svg";
import SiteActions from "./site-actions";

export default function Navbar({ user, toggleMenu }) {
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
        <Responsive
          maxWidth={991}
          as={Menu.Menu}
          onClick={toggleMenu}
          position="right"
        >
          <Menu.Item>
            <Icon size="large" style={{ margin: 0 }} name="bars" />
          </Menu.Item>
        </Responsive>
        <Responsive as={Menu.Menu} minWidth={992} position="right">
          <SiteActions user={user} />
        </Responsive>
      </Container>
    </Menu>
  );
}
