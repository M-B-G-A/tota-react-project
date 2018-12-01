import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import { withRouter } from "react-router";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import * as appActions from "../reducers/app";
import * as routes from "../constants";
import { scatterNetwork } from "../apis/scatter";
import { eos } from "../apis/eos";

const styles = {
  content: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
};

class Header extends Component {

  componentDidMount() {

    ScatterJS.plugins( new ScatterEOS() );
    ScatterJS.scatter.connect('ToTa').then(connected => {
      if(!connected) return false;
      const scatter = ScatterJS.scatter;
      const requiredFields = { accounts:[scatterNetwork] };




      scatter.getIdentity(requiredFields).then(() => {
        const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
        console.log(account);
        this.props.appActions.setUserAccount(account);
        localStorage.setItem('account', account);

        eos.getAccount(account.name).then(res => {
          this.props.appActions.setUserAccountInfo(res);
        })
      }).catch(error => {
        console.error(error);
      });
    });
  }

  onNavItemClicked = (route) => {
    switch(route) {
      case routes.LANDING:
        return this.props.history.push(routes.HOME);
      case routes.MYBET:
        return this.props.history.push(routes.MYBET);
      case routes.PROXY:
        return this.props.history.push(routes.PROXY);
      case routes.INFO:
        return this.props.history.push(routes.INFO);
    }
  };

  render() {
    return (
      <Navbar fixedTop={true} staticTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <div onClick={() => this.onNavItemClicked(routes.LANDING)}>
              <img src= { process.env.PUBLIC_URL + "Logo_line.png" } alt="" style={{ width: 80, height: 20 }} />
            </div>
          </Navbar.Brand>
          <Nav>
            <NavItem onClick={() => this.onNavItemClicked(routes.PROXY)}>
              PROXY
            </NavItem>
            <NavItem onClick={() => this.onNavItemClicked(routes.MYBET)}>
              My bet
            </NavItem>
            <NavItem onClick={() => this.onNavItemClicked(routes.INFO)}>
              Info
            </NavItem>
          </Nav>
        </Navbar.Header>
        <Nav pullRight style={{ display: 'table-cell' }}>
         <NavItem>
           <u>{ this.props.account === null ? "로그인 필요" : this.props.account.name }</u>
         </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  account: state.app.account,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Header);
