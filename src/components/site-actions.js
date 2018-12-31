import React from "react";
import netlifyIdentity from "netlify-identity-widget";
import { Menu, Header } from "semantic-ui-react";

import * as styles from "../styles";

export default function SiteActions({
  className = "",
  user,
  closeMenu = () => {}
}) {
  return (
    <React.Fragment>
      {user ? (
        <React.Fragment>
          <Menu.Item className={className}>
            <Header as="h5">Welcome, {user.user_metadata.full_name}.</Header>
          </Menu.Item>
          <Menu.Item
            className={className}
            onClick={() => {
              netlifyIdentity.logout();
              closeMenu();
            }}
            style={styles.fancyText}
          >
            Sign out
          </Menu.Item>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Menu.Item
            className={className}
            onClick={() => {
              netlifyIdentity.open("login");
              closeMenu();
            }}
            style={styles.fancyText}
          >
            Sign in
          </Menu.Item>
          <Menu.Item
            className={className}
            onClick={() => {
              netlifyIdentity.open("signup");
              closeMenu();
            }}
            style={styles.fancyText}
          >
            Sign up
          </Menu.Item>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
