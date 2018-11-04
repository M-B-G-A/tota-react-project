import React, { Component } from "react";
import { Navbar, Nav, NavItem, SplitButton, MenuItem } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl"

const styles = {
}

class Footer extends Component {
  render() {
    return (
      <Navbar staticTop={true} fixedBottom={true}>
        <Navbar.Header>
          <Navbar.Brand>
            copyright.
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}
export default Footer;
