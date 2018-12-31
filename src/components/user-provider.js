import React, { Component } from "react";
import netlifyIdentity from "netlify-identity-widget";

export const UserContext = React.createContext();

const USER_KEY = "SmashCombos User";

const loginUser = () => {
  if (netlifyIdentity && netlifyIdentity.currentUser()) {
    const {
      app_metadata,
      created_at,
      confirmed_at,
      email,
      id,
      user_metadata
    } = netlifyIdentity.currentUser();

    if (window && window.localStorage) {
      window.localStorage.setItem(
        USER_KEY,
        JSON.stringify({
          app_metadata,
          created_at,
          confirmed_at,
          email,
          id,
          user_metadata
        })
      );
    }
  }
};

const logoutUser = () =>
  window && window.localStorage && window.localStorage.removeItem(USER_KEY);

export default class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    if (window && window.localStorage) {
      const user = window.localStorage.getItem(USER_KEY);

      user
        ? this.setState({
            user: JSON.parse(user)
          })
        : loginUser();
    }

    netlifyIdentity.on("login", user => this.setState({ user }));
    netlifyIdentity.on(
      "logout",
      () => this.setState({ user: null }),
      logoutUser
    );
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
