import React from "react";
import { Link } from "gatsby";
import { Container, Header, Image, Menu } from "semantic-ui-react";
import netlifyIdentity from "netlify-identity-widget";

import * as styles from "../styles";
import logo from "../img/logo.svg";

export default function Navbar({ user }) {
  console.log("\n\n\n", "user", user, "\n\n\n");
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
          {user ? (
            <React.Fragment>
              <Menu.Item>
                <Header as="h5">
                  Welcome,
                  <br /> {user.user_metadata.full_name}.
                </Header>
              </Menu.Item>
              <Menu.Item
                onClick={() => netlifyIdentity.logout()}
                style={styles.fancyText}
              >
                Sign out
              </Menu.Item>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Menu.Item
                onClick={() => netlifyIdentity.open("login")}
                style={styles.fancyText}
              >
                Sign in
              </Menu.Item>
              <Menu.Item
                onClick={() => netlifyIdentity.open("signup")}
                style={styles.fancyText}
              >
                Sign up
              </Menu.Item>
            </React.Fragment>
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
