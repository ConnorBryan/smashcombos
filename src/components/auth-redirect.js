import React, { Component } from "react";

import { auth, UserContext } from "./user-provider";

export class AbstractAuthRedirect extends Component {
  componentDidMount() {
    const { navigate } = this.props;

    if (!auth.currentUser()) {
      setTimeout(() => navigate("/sign-in"), 0);
    }
  }

  componentDidUpdate(prevProps) {
    const { navigate, user } = this.props;

    if (!user && prevProps.user) {
      navigate("/sign-in");
    }
  }

  render() {
    return this.props.children;
  }
}

export default function AuthRedirect({ navigate, children }) {
  return (
    <UserContext.Consumer>
      {({ user }) => (
        <AbstractAuthRedirect navigate={navigate} user={user}>
          {children}
        </AbstractAuthRedirect>
      )}
    </UserContext.Consumer>
  );
}
