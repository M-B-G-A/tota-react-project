import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import { withRouter } from "react-router";

const styles = {
};

class Header extends Component {
  render() {
    return (
      <Navbar fixedTop={true} staticTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            EOS
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default Header;
