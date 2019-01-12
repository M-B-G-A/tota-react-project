import React, { Component } from "react";
import { Modal, Button, Form, FormGroup, FormControl, HelpBlock, ControlLabel } from "react-bootstrap";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from "eosjs";
import { scatterNetwork } from "../../apis/scatter";
import { CommonUtil } from "../../utils";
import { FormattedHTMLMessage } from "react-intl";

/* Betting Dialog */
class BettingDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      error: "",
    };
  }

  componentDidMount() {
  }

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  }

  updateProducerVote = (e) => {
    ScatterJS.plugins(new ScatterEOS());
    const scatter = ScatterJS.scatter;
    const eos = scatter.eos( scatterNetwork, Eos, { authorization: [`${this.props.account.name}@${this.props.account.authority}`] } );
    eos.voteproducer(this.props.account.name, this.props.selectedProxy.account, []).then(res => {
      this.props.setUserProxy(this.props.selectedProxy);
      this.props.openBettingDialog(true, this.props.selectedProxy)
    });
  }

  onBettingButtonClicked = () => {
    if (this.state.inputText === "") {
      this.setState({
        error: "input_error_empty_value",
      });
      return
    }

    if (this.state.inputText * 1.0 > CommonUtil.getAmount(this.props.accountInfo.core_liquid_balance, null)) {
      this.setState({
        error: "input_error_insufficient_amount",
      });
      return
    }

    ScatterJS.plugins(new ScatterEOS());
    const scatter = ScatterJS.scatter;
    const eos = scatter.eos( scatterNetwork, Eos, { authorization: [`${this.props.account.name}@${this.props.account.authority}`] } );
    eos.contract('totatestgame').then(myaccount => {
      const option = {authorization: `${this.props.account.name}@${this.props.account.authority}`};
      myaccount.insertcoin(this.props.account.name, 
        CommonUtil.zero4(this.state.inputText) + " EOS", this.props.currentGame, 
        this.props.accountInfo["voter_info"]["proxy"],
        option
      ).then(res => {
        console.log(res);
        this.props.openBettingDialog(false);
      }).catch(err => {
        if (err.message === void 0) {
          alert(err);
        } else {
          alert(err.message);
        }
      });
    });
  }

  render() {
    if (this.props.isOpenBettingDialog === false) {
      return null;
    }
    if (this.props.selectedProxy !== null && this.props.proxy !== null && this.props.selectedProxy.name === this.props.proxy.name) {
      return (
        <div>
        <Modal show={this.props.isOpenBettingDialog} onHide={() => {this.props.openBettingDialog(false)}}>
          <Modal.Header closeButton style={{ border: 'none' }}>
            <Modal.Title>
              <div style={{ width: '100%', textAlign: 'center' }}>
                <FormattedHTMLMessage id="bet_popup_title" values={{ value: this.props.currentGame + 1 }} />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ width:'100%', textAlign: 'center' }}>
              <FormattedHTMLMessage id="bet_delegate_proxy" values={{ value: this.props.proxy.name }} />
            </div>
            <Form inline style={{ marginTop: 20, padding: 10, textAlign: 'center' }}>
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel>{ this.props.proxy.name }{' '}에 베팅하기</ControlLabel>{' '}
                <FormControl
                  type="text"
                  value={this.state.inputText}
                  placeholder="Enter Amount"
                  onChange={this.handleChange}
                  style={{ marginRight: 10, marginLeft: 10, border: 'none', boxShadow: 'none', borderBottom: 'solid 1px #979797', borderRadius: '0' }}
                />
                {' '}<ControlLabel>EOS</ControlLabel>
                <FormControl.Feedback />
                <HelpBlock style={{ color: 'red' }}>{ this.state.error === "" ? null : (<FormattedHTMLMessage id={this.state.error} />) }</HelpBlock>
              </FormGroup>
            </Form>
            <div style={{ width: '100%', textAlign: 'right', paddingRight: 120 }}>
              <FormattedHTMLMessage id="bet_proxy_my_account" />{' '}:{' '}{ this.props.accountInfo.core_liquid_balance }
            </div>
          </Modal.Body>
          <Modal.Footer style={{ border: 'none' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Button
                bsStyle="info"
                bsSize="large"
                onClick={() => this.onBettingButtonClicked()}
                style={{ width: '50%', height: '92' }}
              >
                <FormattedHTMLMessage id="bet_proxy_btn" />
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
      )
    }
    if (this.props.selectedProxy !== null) {
      return (
        <div>
          <Modal show={this.props.isOpenBettingDialog} onHide={() => {this.props.openBettingDialog(false)}}>
          <Modal.Header closeButton style={{ border: 'none' }}>
            <Modal.Title>
              <div style={{ width: '100%', textAlign: 'center' }}>
                { this.props.proxy === null ? (<FormattedHTMLMessage id="main_bet_alert" />) : (<FormattedHTMLMessage id="proxy_change_title" />) }
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ width:'100%', textAlign: 'center' }}>
              <FormattedHTMLMessage id="main_bet_delegate_desc2" values={{ value: this.props.selectedProxy.name }} />
            </div>
          </Modal.Body>
          <Modal.Footer style={{ border: 'none' }}>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Button
                bsStyle="info"
                bsSize="large"
                onClick={() => this.updateProducerVote()}
                style={{ width: '50%', height: '92' }}
              >
                <FormattedHTMLMessage id="main_bet_delegate_btn" />
              </Button>
            </div>
            </Modal.Footer>
          </Modal>
        </div>
      )
    }
    return null;
  };
}
export default BettingDialog;
