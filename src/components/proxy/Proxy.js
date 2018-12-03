import React, { Component } from "react";
import { Grid, Row, Col, Jumbotron, Button, Thumbnail, ProgressBar, Table } from "react-bootstrap";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import * as appActions from "../../reducers/app";
import * as proxyActions from "../../reducers/proxy";
import { eosMainnet } from "../../apis/eos";
import * as routes from "../../constants";
import { firebase } from "../../apis/firebase";

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
  constructor(props) {
    super(props);
  }

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
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.producer !== nextProps.producers) {
      nextProps.producers.map(producer => {
        if (producer.image === null) {
          firebase.storage.ref().child(`img/${this.props.proxy.name.toLowerCase()}/${producer.name}.png`).getDownloadURL().then((url) => {
            this.props.proxyActions.updateProxyProducerImage({ name: producer.name, image: url });
          }).catch((error) => {
            console.error(error);
            this.props.proxyActions.updateProxyProducerImage({ name: producer.name, image: "error" });
          })
        }
      });
    }
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
              <h3>지지중인 프록시</h3>
              <h3>
              {this.props.proxy.name} Proxy
              </h3>
            </Col>
            <Col md={6} style={{ textAlign: 'right' }}>
              <h3>총 {this.props.proxy.delegated}</h3>
              <h3>
               위임 중
              </h3>
            </Col>
          </Row>
          <Row>
          <hr />
          <Row style={{ paddingBottom: 30 }}>
            프록시의 투표 리스트
          </Row>
            {
              this.props.producers.map((producer, index) =>
                <Col xs={6} sm={6} md={4} lg={4} key={index}>
                  <Thumbnail src={ producer.image } alt="200x200" style={{ textAlign: 'center', backgroundColor: '#F8F8F8' }}>
                    <h2 style={{ fontSize: '2vw' }}>
                      { producer.name }
                    </h2>
                  </Thumbnail>
                </Col>
              )
            }
          </Row>
          <hr />
          <Row style={{ paddingBottom: 30 }}>
            {this.props.currentGame + 1} 회차 나의 배팅 내역
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

  proxy: state.proxy.proxy,
  producers: state.proxy.producers,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
  proxyActions: bindActionCreators(proxyActions, dispatch)
});


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Proxy);
