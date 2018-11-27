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
        <Nav pullRight>
            Copyright ⓒ Tota. All rights reserved.
        </Nav>
      </Navbar>
    );
  }
}
export default Footer;
