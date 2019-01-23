import React from "react";
import { Link } from "gatsby";
import { Menu, Icon } from "semantic-ui-react";

import * as styles from "../styles";

export default function SiteActions({
  className = "",
  user,
  closeMenu = () => {},
  signout
}) {
  return (
    <>
      {user ? (
        <>
          <Menu.Item
            as={Link}
            to="/dashboard"
            className={className}
            style={styles.fancyText}
          >
            <Icon name="dashboard" /> Dashboard
          </Menu.Item>
          <Menu.Item
            className={className}
            onClick={() => {
              closeMenu();
              signout();
            }}
            style={styles.fancyText}
          >
            <Icon name="sign out" /> Sign out
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item
            as={Link}
            to="/sign-in"
            className={className}
            onClick={closeMenu}
            style={styles.fancyText}
          >
            <Icon name="sign in" /> Sign in
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/sign-up"
            className={className}
            onClick={closeMenu}
            style={styles.fancyText}
          >
            <Icon name="user plus" /> Sign up
          </Menu.Item>
        </>
      )}
    </>
  );
}
