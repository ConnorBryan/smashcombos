import React, { Component } from "react";

import { auth, UserContext } from "./user-provider";

export class AbstractRedirect extends Component {
  componentDidMount() {
    const { navigate, redirect } = this.props;

    if (!auth.currentUser()) {
      setTimeout(() => navigate(redirect), 0);
    }
  }

  componentDidUpdate(prevProps) {
    const { navigate, user, redirect } = this.props;

    if (!user && prevProps.user) {
      navigate(redirect);
    }
  }

  render() {
    return this.props.children;
  }
}

export default function Redirect({ navigate, children, redirect }) {
  return (
    <UserContext.Consumer>
      {({ user }) => (
        <AbstractRedirect navigate={navigate} user={user} redirect={redirect}>
          {children}
        </AbstractRedirect>
      )}
    </UserContext.Consumer>
  );
}
