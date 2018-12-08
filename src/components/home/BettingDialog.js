import React, { Component } from "react";
import { Modal, Button, Form, FormGroup, FormControl, HelpBlock, ControlLabel } from "react-bootstrap";
import { connect } from "react-redux";
// import Eos from "eosjs";
// import binaryen from "binaryen";
import { eosJS, eos, eosMainnet } from "../../apis/eos";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from "eosjs";
import { scatterNetwork, scatterRealNetwork } from "../../apis/scatter";
import { CommonUtil } from "../../utils";
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
      // res 체크
      console.log(res);
      this.props.setUserProxy(this.props.selectedProxy);
      this.props.openBettingDialog(false)
    });
  }

  onBettingButtonClicked = () => {
    if (this.state.inputText === "") {
      this.setState({
        error: "값을 입력해주세요.",
      });
      return
    }

    if (this.state.inputText * 1.0 > CommonUtil.getAmount(this.props.accountInfo.core_liquid_balance, null)) {
      this.setState({
        error: "보유량보다 높습니다.",
      });
      return
    }

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
    if (this.props.isOpenBettingDialog === false) {
      return null;
    }
    if (this.props.proxy !== this.props.selectedProxy && this.props.selectedProxy !== null) {
      return (
        <div>
          <Modal show={this.props.isOpenBettingDialog} onHide={() => {this.props.openBettingDialog(false)}}>
          <Modal.Header closeButton style={{ border: 'none' }}>
            <Modal.Title>
              <div style={{ width: '100%', textAlign: 'center' }}>
                { this.props.proxy === null ? '지지하는 프록시가 없습니다.' : '지지하는 프록시 변경하기' }
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ width:'100%', textAlign: 'center' }}>
              { this.props.selectedProxy.name } 를 지지하시겠습니까?
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
                지지하기
              </Button>
            </div>
            </Modal.Footer>
          </Modal>
        </div>
      )
    }
    return (
      <div>
        <Modal show={this.props.isOpenBettingDialog} onHide={() => {this.props.openBettingDialog(false)}}>
          <Modal.Header closeButton style={{ border: 'none' }}>
            <Modal.Title>
              <div style={{ width: '100%', textAlign: 'center' }}>
                { this.props.currentGame + 1 } 라운드 베팅하기
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ width:'100%', textAlign: 'center' }}>
              나의 지지 프록시 : { this.props.proxy.name }
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
                <HelpBlock style={{ color: 'red' }}>{ this.state.error }</HelpBlock>
              </FormGroup>
            </Form>
            <div style={{ width: '100%', textAlign: 'right', paddingRight: 120 }}>
              나의 보유량 : { this.props.accountInfo.core_liquid_balance }
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
                베팅하기
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
}
export default BettingDialog;
