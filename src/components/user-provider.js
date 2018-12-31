import React, { Component } from "react";
import netlifyIdentity from "netlify-identity-widget";

export const UserContext = React.createContext();

export default class UserProvider extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    if (window && window.localStorage) {
      const storedUser = window.localStorage.getItem("gotrue.user");

      if (storedUser) {
        this.setState({
          user: JSON.parse(storedUser)
        });
      }
    }

    netlifyIdentity.on("login", user => {
      console.log("Login callback");
      this.setState({ user });
    });
    netlifyIdentity.on("logout", () => {
      console.log("Logout callback");
      setTimeout(() => {
        console.log("Closing window.");
        netlifyIdentity.close();
      }, 2000);
      this.setState({ user: null });
    });
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
