import React from "react";
import { Link } from "gatsby";
import { Container, Icon, Image, Menu } from "semantic-ui-react";

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
        <Menu.Menu position="right">
          <Menu.Item
            className="mobile-only"
            onClick={() => {
              toggleMenu();
              window.scrollTo(0, 0);
            }}
          >
            <Icon size="large" style={{ margin: 0 }} name="bars" />
          </Menu.Item>
          <SiteActions className="desktop-only" user={user} />
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
