import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import * as appActions from "../../reducers/app";
import * as proxyActions from "../../reducers/proxy";
import { eosMainnet } from "../../apis/eos";
import * as routes from "../../constants";
import { firebase } from "../../apis/firebase";
import { FormattedHTMLMessage } from "react-intl"

const styles = {
  root: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    display: 'flex',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    display: 'flex',
    paddingBottom: 20,
  },
};
class Proxy extends Component {
  componentDidMount() {
    if (this.props.proxy === null) {
      this.props.history.push(routes.HOME);
      return
    }
    // Proxy의 BP들은 Mainnet에서 가져온다.
    eosMainnet.getAccount(this.props.proxy.account).then(res => {
      const producers = res["voter_info"]["producers"];
      const array = [];
      for (let i in producers) {
        array.push({ name: producers[i], image: null })
      }
      this.props.proxyActions.setProxyProducers(array);
    })

    const timer = setInterval(() => {
      if (this.props.producers.length !== 0) {
        clearInterval(timer)
        this.props.producers.map(producer => {
          firebase.storage.ref().child(`img/${this.props.proxy.name.toLowerCase()}/${producer.name}.png`).getDownloadURL().then((url) => {
            this.props.proxyActions.updateProxyProducerImage({ name: producer.name, image: url });
          }).catch((error) => {
            this.props.proxyActions.updateProxyProducerImage({ name: producer.name, image: process.env.PUBLIC_URL + "no_image.png" });
          });
        });
      }
    }, 1000);
  }

  render() {
    if (this.props.proxy === null) {
      return null;
    }
    return (
      <div style={styles.root}>
        <Grid>
          <Row style={{ paddingBottom: 30 }}>
            <Col md={6}>
              <h3><FormattedHTMLMessage id="proxy_main_title" /></h3>
              <h3>
              {this.props.proxy.name} Proxy
              </h3>
            </Col>
            {/* <Col md={6} style={{ textAlign: 'right' }}>
              <h3>총 {this.props.proxy.delegated.toFixed(4)}{' '}EOS</h3>
              <h3>
               위임 중
              </h3>
            </Col> */}
          </Row>
          <Row>
          <hr />
          <Row style={{ paddingBottom: 30 }}>
            <Col md={6}>
              <h3><FormattedHTMLMessage id="proxy_delegae_list" /></h3>
            </Col>
          </Row>
            {
              this.props.producers.map((producer, index) =>
                <Col xs={4} sm={4} md={2} lg={2} key={index} style={{ marginBottom: 50 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 100, height: 100, textAlign: 'center', display: 'inline-block', marginBottom: 30 }}>
                      <img src={ producer.image } alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      { producer.name }
                    </div>
                  </div>
                </Col>
              )
            }
          </Row>
          <hr />
          <Row style={{ paddingBottom: 30 }}>
            <Col md={6}>
              <h3><FormattedHTMLMessage id="period_bet_history_title" values={{ value: this.props.currentGame + 1 }} /></h3>
            </Col>
            <Col md={6} style={{ textAlign: 'right' }}>
              <h3><FormattedHTMLMessage id="period_bet_total" values={{ value: this.props.currentGameAmount}} /></h3>
            </Col>
          </Row>
          <Row style={{ paddingBottom: 30 }}>
            <Col md={6}>
              <p><FormattedHTMLMessage id="period_bet_history_desc1" /></p>
              <p><FormattedHTMLMessage id="period_bet_history_desc2" /></p>
            </Col>
          </Row>
          {/* <Row style={{ paddingBottom: 30 }}>
            최근 회차별 승률
          </Row> */}
        </Grid>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  proxies: state.app.proxies,
  account: state.app.account,
  isOpenBettingDialog: state.app.isOpenBettingDialog,
  accountInfo: state.app.accountInfo,
  currentGame: state.app.currentGame,
  currentGameAmount: state.app.currentGameAmount,
  proxy: state.proxy.proxy,
  producers: state.proxy.producers,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
  proxyActions: bindActionCreators(proxyActions, dispatch)
});


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Proxy);
