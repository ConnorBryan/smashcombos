import React, { Component } from "react";
import GoTrue from "gotrue-js";

export const UserContext = React.createContext();

export const auth = new GoTrue({
  APIUrl: "https://smash-combos.netlify.com/.netlify/identity",
  audience: "",
  setCookie: true
});

export default class UserProvider extends Component {
  state = {
    user: (typeof window !== "undefined" && auth.currentUser()) || null,
    signup: async (email, password) => {
      try {
        await auth.signup(email, password);

        return true;
      } catch (error) {
        console.error(error);

        return null;
      }
    },
    signin: async (email, password) => {
      try {
        const user = await auth.login(email, password);

        this.setState({
          user
        });

        return true;
      } catch (error) {
        console.error(error);

        return false;
      }
    },
    signout: () => {
      this.setState({ user: null });

      auth.currentUser().logout();
    },
    requestPasswordRecovery: async email => {
      try {
        await auth.requestPasswordRecovery(email);

        return true;
      } catch (error) {
        console.error(error);

        return false;
      }
    }
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
