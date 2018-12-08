import React, { Component } from "react";
import { Navbar, SplitButton, MenuItem } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl"
import * as appActions from "../reducers/app";
import { bindActionCreators } from "redux";

class Footer extends Component {

  handleSelectLanguage = (key, event) => {
    this.props.appActions.setUserSiteLanguage(key)
  };

  render() {
    return (
      <Navbar staticTop={true} style={{ marginBottom: 0 }}>
        <div>
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
                <FormattedMessage id="language" />
                <SplitButton
                  bsSize="xsmall"
                  title={<FormattedMessage id={this.props.userSiteLanguage} />}
                  dropup id="split-button-dropup"
                  onSelect={(k, e) => this.handleSelectLanguage(k, e)}
                  style={{ marginLeft: 10 }}>
                  {
                    this.props.siteLanguages.map((item, index) => (
                      <MenuItem eventKey={item} key={index}>
                        {<FormattedMessage id={item} />}
                      </MenuItem>
                    ))
                  }
                </SplitButton>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  userSiteLanguage: state.app.userSiteLanguage,
  siteLanguages: state.app.siteLanguages,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Footer);
