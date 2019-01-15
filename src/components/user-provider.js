import React, { Component } from "react";
import GoTrue from "gotrue-js";

export const UserContext = React.createContext();

export default class UserProvider extends Component {
  state = {
    user: null,
    signup: async (email, password) => {
      try {
        await this.auth.signup(email, password);

        return true;
      } catch (error) {
        console.error(error);

        return null;
      }
    },
    signin: async (email, password) => {
      try {
        const user = await this.auth.login(email, password);

        this.setState({
          user
        });

        if (window && window.localStorage) {
          window.localStorage.setItem("gotrue.user", JSON.stringify(user));
        }

        return true;
      } catch (error) {
        console.error(error);

        return false;
      }
    },
    signout: () => {
      this.setState({ user: null });

      window.localStorage.removeItem("gotrue.user");

      this.auth.currentUser().logout();
    }
  };

  auth = new GoTrue({
    APIUrl: "https://smash-combos.netlify.com/.netlify/identity",
    audience: "",
    setCookie: true
  });

  componentDidMount() {
    if (window && window.localStorage) {
      const storedUser = window.localStorage.getItem("gotrue.user");

      if (storedUser) {
        this.setState({
          user: JSON.parse(storedUser)
        });
      }
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
