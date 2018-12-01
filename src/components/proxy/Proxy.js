import React, { Component } from "react";
import { Grid, Row, Col, Jumbotron, Button, Thumbnail, ProgressBar, Table } from "react-bootstrap";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import * as appActions from "../../reducers/app";
const styles = {
  root: {
    width: '50%',
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
  render() {
    return (
      <div style={styles.root}>
        <Grid>
          <Row style={{ paddingBottom: 30 }}>
            <h3>지지중인 프록시</h3>
            <h3>
            {this.props.accountInfo === null ? null : (this.props.proxies.filter(item => item.account === this.props.accountInfo["voter_info"]["proxy"])[0].name)} Proxy
            </h3>
          </Row>
          <Row>
          <hr />
          <Row style={{ paddingBottom: 30 }}>
            프록시의 투표 리스트
          </Row>
            {
              ["1", "2", "3"].map((item, index) =>
                <Col xs={6} sm={6} md={4} lg={4} key={index}>
                  <Thumbnail src={ process.env.PUBLIC_URL + "Logo_line.png" } alt="200x200" style={{ textAlign: 'center', backgroundColor: '#F8F8F8' }}>
                    <h2 style={{ fontSize: '2vw' }}>
                      { item }
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
          <Row style={{ paddingBottom: 30 }}>
            최근 회차별 승률
          </Row>
        </Grid>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  proxies: state.app.proxies,
  games: state.app.games,
  account: state.app.account,
  isOpenBettingDialog: state.app.isOpenBettingDialog,
  accountInfo: state.app.accountInfo,
  currentGame: state.app.currentGame,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
});


export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Proxy);
