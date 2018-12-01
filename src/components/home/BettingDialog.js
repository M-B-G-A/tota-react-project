import React, { Component } from "react";
import { Modal, Button, Form, FormGroup, FormControl, HelpBlock } from "react-bootstrap";
import { connect } from "react-redux";
// import Eos from "eosjs";
// import binaryen from "binaryen";
import { eosJS } from "../../apis/eos";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from "eosjs";
import { scatterNetwork } from "../../apis/scatter";
import { CommonUtil } from "../../utils";
/* Betting Dialog */
class BettingDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
    };
  }

  componentDidMount() {
    
  }

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  }

  onBettingButtonClicked = () => {
    ScatterJS.plugins(new ScatterEOS());
    const scatter = ScatterJS.scatter;
    const eos = scatter.eos( scatterNetwork, Eos, { authorization: [`${this.props.account.name}@${this.props.account.authority}`] } );
    eos.contract('totatestgame').then(myaccount => {
      myaccount.insertcoin(this.props.account.name, CommonUtil.zero4(this.state.inputText) + " EOS", this.props.currentGame, this.props.accountInfo["voter_info"]["proxy"]).then(res => {
        console.log('result', res);
        // if (res["error"] !== null) {
        // } else {
        //   console.log(res["message"]);
        // }
      });
      this.props.openBettingDialog(false);
    });
  }

  render() {
    return (
      <div>
        <Modal show={this.props.isOpenBettingDialog} onHide={() => {this.props.openBettingDialog(false)}}>
          <Modal.Header closeButton>
            <Modal.Title>
              { this.props.currentGame + 1 } 라운드 베팅하기
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            나의 지지 프록시 : { this.props.accountInfo === null ? null : (this.props.proxies.filter(item => item.account === this.props.accountInfo["voter_info"]["proxy"])[0].name) }
            <Form>
              <FormGroup
                controlId="formBasicText"
              >
                <FormControl
                  type="text"
                  value={this.state.inputText}
                  placeholder="Enter text"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="primary"
              onClick={() => this.onBettingButtonClicked()}
            >
              베팅하기
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
}
export default BettingDialog;
