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
      <Navbar staticTop={true} style={{ marginBottom: 0 }}>
        <Nav>
          <div style={{ marginTop: 20, marginBottom: 20 }}>
           {/* ToTa Logo */}
            <div style={{ display: 'table-row' }}>
              <img src= { process.env.PUBLIC_URL + "Logo_line.png" } alt="" style={{ width: 80, height: 20, marginRight: 20 }} />
              프로젝트 토타
            </div>
            {/* GitHub */}
            <div style={{ display: 'table-row' }}>
              <div style={{ display: 'table-cell' }}>
                GitHub
              </div>
              <div style={{ display: 'table-cell' }}>
                https://github.com/currybab/tota_contracts
              </div>
            </div>
            {/* Language */}
            <div style={{ display: 'table-row' }}>
              <div style={{ display: 'table-cell' }}>
              Language
              </div>
              <div style={{ display: 'table-cell' }}>
                한국어 <u>변경하기</u>
              </div>
            </div>
          </div>
        </Nav>
      </Navbar>
    );
  }
}
export default Footer;
