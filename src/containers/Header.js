import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import { withRouter } from "react-router";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';

const styles = {
};

class Header extends Component {

  componentDidMount() {
    const network = {
      blockchain:'eos',
      protocol:'https',
      host:'nodes.get-scatter.com',
      port:443,
      chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    }

    ScatterJS.plugins( new ScatterEOS() );

    ScatterJS.scatter.connect('ToTa').then(connected => {
      // If the user does not have Scatter or it is Locked or Closed this will return false;
      if(!connected) return false;
  
      const scatter = ScatterJS.scatter;
      // Now we need to get an identity from the user.
      // We're also going to require an account that is connected to the network we're using.
      const requiredFields = { accounts:[network] };
      scatter.getIdentity(requiredFields).then(() => {
          // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
          // the user for their account name beforehand. They could still give you a different account.
          const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
         console.log('account');
         console.log(account);
          // You can pass in any additional options you want into the eosjs reference.
          // const eosOptions = { expireInSeconds:60 };
  

          // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
          // const eos = scatter.eos(network, Eos, eosOptions);
  
          // console.log(eos);
          // ----------------------------
          // Now that we have an identity,
          // an EOSIO account, and a reference
          // to an eosjs object we can send a transaction.
          // ----------------------------
        }).catch(error => {
          // The user rejected this request, or doesn't have the appropriate requirements.
          console.error(error);
      });
    });
  }

  render() {
    return (
      <Navbar fixedTop={true} staticTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            EOS
          </Navbar.Brand>
          <NavItem>

          </NavItem>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default Header;
