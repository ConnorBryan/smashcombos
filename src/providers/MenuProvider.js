import React, { Component } from "react";

export const MenuContext = React.createContext();

export default class MenuProvider extends Component {
  state = {
    isOpen: false,
    open: () => {
      this.setState({ isOpen: true });
      document.body.classList.add("hide-scroll");
    },
    close: () => {
      this.setState({ isOpen: false });
      document.body.classList.remove("hide-scroll");
    },
    toggle: () => {
      const { isOpen } = this.state;

      isOpen ? this.state.close() : this.state.open();
    }
  };

  render() {
    return (
      <MenuContext.Provider value={this.state}>
        {this.props.children}
      </MenuContext.Provider>
    );
  }
}
