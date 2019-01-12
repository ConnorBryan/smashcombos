import React from "react";
import netlifyIdentity from "netlify-identity-widget";
import { Menu, Header, Icon } from "semantic-ui-react";

import * as styles from "../styles";

export default function SiteActions({
  className = "",
  user,
  closeMenu = () => {}
}) {
  return (
    <>
      {user ? (
        <>
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
            <Icon name="sign out" /> Sign out
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item
            className={className}
            onClick={() => {
              netlifyIdentity.open("login");
              closeMenu();
            }}
            style={styles.fancyText}
          >
            <Icon name="sign in" /> Sign in
          </Menu.Item>
          <Menu.Item
            className={className}
            onClick={() => {
              netlifyIdentity.open("signup");
              closeMenu();
            }}
            style={styles.fancyText}
          >
            <Icon name="user plus" /> Sign up
          </Menu.Item>
        </>
      )}
    </>
  );
}
