import React, { Component } from "react";

import { auth } from "../../components/user-provider";

export default class Dashboard extends Component {
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
    const { user } = this.props;

    return <p>Dashboard</p>;
  }
}
