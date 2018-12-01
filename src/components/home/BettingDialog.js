import React, { Component } from "react";
import { Modal, Button, Form, FormGroup, FormControl, HelpBlock } from "react-bootstrap";
import { connect } from "react-redux";
// import Eos from "eosjs";
// import binaryen from "binaryen";
import { eosJS } from "../../apis/eos";
import ScatterEOS from 'scatterjs-plugin-eosjs';
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
    console.log('hu');
  //cleos push action totagamelist insertcoin '["hakyungzzang", "10.0000 EOS", 4, 2]' -p hakyungzzang@active
    // const eos = Eos({"", binaryen});
    // const options = {
    //   authorization: this.props.account.name + '@active',
    //   broadcast: true,
    //   sign: true
    // }

    const options = { authorization: [`${this.props.account.name}@${this.props.account.authority}`] }

    const eos = ScatterEOS({ httpEndpoint:'https://jungle2.cryptolions.io:443', signatureProvider:scatter.eosHook(network) })

    eos.contract('totagamelist', options).then(myaccount => {
      console.log(myaccount);
      myaccount.insertcoin("hakyungzzang", "1.0000 EOS", 4, 2);
    });
  }

  render() {
    return (
      <div>
        <Modal show={this.props.isOpenBettingDialog} onHide={() => {this.props.openBettingDialog(false)}}>
          <Modal.Header closeButton>
            <Modal.Title>
              74회차 라운드 베팅하기
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
