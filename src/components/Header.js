import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import { withRouter } from "react-router";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from "eosjs";
import * as appActions from "../reducers/app";
import * as proxyActions from "../reducers/proxy";
import * as routes from "../constants";
import { scatterNetwork } from "../config/scatter";
import { CommonUtil } from "../utils";
import { FormattedHTMLMessage } from "react-intl";

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "scatter_warning2",
    };
  }

  componentDidMount() {
    ScatterJS.plugins( new ScatterEOS() );
    
    ScatterJS.scatter.connect('ToTa').then(connected => {
      if(!connected) {
        this.setState({ status: "scatter_warning1" });
        return false;
      };
      const scatter = ScatterJS.scatter;
      const requiredFields = { accounts:[scatterNetwork] };

      scatter.getIdentity(requiredFields).then(() => {
        const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
        this.props.appActions.setUserAccount(account);
        localStorage.setItem('account', account);
        let eos = ScatterJS.scatter.eos(scatterNetwork, Eos, { authorization: [`${this.props.account.name}@${this.props.account.authority}`] });
        // account Detail
        eos.getAccount(account.name).then(res => {
          this.props.appActions.setUserAccountInfo(res);

          // 내가 지지하는 프록시 세팅
          const proxy = this.props.proxies.filter(item => item.account === res["voter_info"]["proxy"])
          if (proxy.length !== 0) {
            this.props.proxyActions.setUserProxy(proxy[0]);
          }
        });

        eos.getTableRows(true, "totatestgame", "totatestgame", "histories2", "", this.props.account.name, this.props.account.name, this.props.currentGame, "i64", "2").then((res) => {
          let histories = res.rows.filter(history => history.game_key === this.props.currentGame)
          if (histories.length !== 0) {
            this.props.appActions.setCurrentGameAmount(CommonUtil.getAmount(histories[0].amount, 4));
          }
        });
      }).catch(error => {
        this.setState({ status: "scatter_warning2" });
        console.error(error);
      });
    });
  }

  onNavItemClicked = (route) => {

    if (this.props.account === null) {
      return
    }

    if (route === routes.PROXY && this.props.proxy === null) {
      this.props.appActions.setDialogMessage({ title: "main_bet_alert", content: "main_bet_delegate_desc2" });
      this.props.appActions.openDialog(true);
      return
    }

    return this.props.history.push(route);
  };

  render() {
    return (
      <Navbar fixedTop={true} staticTop={true} collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <div onClick={() => this.onNavItemClicked(routes.LANDING)}>
              <img src= { process.env.PUBLIC_URL + "Logo_line.png" } alt="" style={{ width: 80, height: 20 }} />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
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
              {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>PROXY</MenuItem>
                <MenuItem eventKey={3.2}>My bet</MenuItem>
                <MenuItem eventKey={3.3}>Info</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown> */}
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1}>
              <u>{ this.props.account === null ? (<FormattedHTMLMessage id={this.state.status} />) : this.props.account.name }</u>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  account: state.app.account,
  proxies: state.app.proxies,
  proxy: state.proxy.proxy,
  currentGame: state.app.currentGame,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
  proxyActions: bindActionCreators(proxyActions, dispatch)
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Header);
