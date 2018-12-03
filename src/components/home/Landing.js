import React, { Component } from "react";
import { Grid, Row, Col, Jumbotron, Button, Thumbnail, ProgressBar, Table } from "react-bootstrap";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { Doughnut } from "react-chartjs";
import { eos, eosMainnet } from "../../apis/eos";
import { CommonUtil, DateUtil } from "../../utils";
import BettingDialog from "./BettingDialog";

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

const data1 = [
	{
		value: 20,
		color:"#F7464A",
		highlight: "#FF5A5E",
    label: "Red",
    text: "22",
	},
	{
		value: 100,
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: "Green"
	},
];
class Landing extends Component {
  componentDidMount() {
    // 게임 가져오기
    eos.getTableRows({"scope":"totatestgame","code":"totatestgame","table":"games2","json":true,"reverse":true}).then((res) => {
      const games = res.rows;
      this.props.appActions.setGames(games);
      // 현재 진행중인 게임 회차
      this.props.appActions.setCurrentGame(games[0]["key"]);
      const totalGameCount = games.length; // 총 게임 수
      this.props.proxies.map((item, index) => {
        // Proxy 승률
        const winGameCount = games.filter(game => game["result"] === (index + 1)).length;
        const drawGameCount = games.filter(game => game["result"] === 3).length;
        const winningAvg = winGameCount / (totalGameCount - drawGameCount);
        // Proxy Account
        eos.getAccount(item.account).then(res => {
          const lastVoteWeight = res["voter_info"]["last_vote_weight"];
          const delegated = lastVoteWeight / Math.pow(2, Math.round((new Date().getTime() / 1000 - 946684800)/(24 * 3600 * 7)) / 52) / 10000
          this.props.appActions.setProxyInfo({ account: item.account, icon: item.icon, delegated: delegated, producers: res["voter_info"]['producers'], winningAvg: winningAvg })
        })
      });
    });

   const timer = setInterval(() => {
      if (this.props.games.length !== 0) {
        const remainingTime = DateUtil.getRemainingTime(this.props.games[0]["end_time"]);
        this.props.appActions.updateRemainingTime(remainingTime);
      }
    }, 1000);
  }

  printRemainingTime() {
    if (this.props.remainingTime !== null) {
      const remain = this.props.remainingTime;
      const D = Math.floor(remain / 86400);
      const H = Math.floor((remain - D * 86400) / 3600 % 3600);
      const M = Math.floor((remain - H * 3600) / 60 % 60);
      const S = Math.floor((remain - M * 60) % 60);

      return H + "시간 " + M + "분 " + S + "초";
    }
  }

  openBettingDialog = (open) => {
    if (this.props.proxy !== null) {
      this.props.appActions.openBettingDialog(open);
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <Grid style={{ paddingTop: 50 }}>
          <Row className="show-grid" style={{ alignItems: 'center', justifyContent: 'center', height: '100%', display: 'flex' }}>
            { this.props.currentGame + 1 } 회차 종료까지
          </Row>
          <Row className="show-grid" style={styles.row}>
            <h3>{ this.printRemainingTime() }</h3>
          </Row>
          <Row className="show-grid">
            <Col>
              <ProgressBar bsStyle="info" active now={86400 - this.props.remainingTime} max={86400} />
            </Col>
          </Row>
          <Row className="show-grid" style={styles.row}>
            <Col>
              <h3>이번 라운드 베팅 {' '}
                <b>
                {
                  this.props.games.length === 0 ? null :
                  CommonUtil.printTotalGameAmount(this.props.games[0]["team1_asset"], this.props.games[0]["team2_asset"])
                }
                </b>
                {' '} EOS
              </h3>
            </Col>
          </Row>
          { /* Proxy Information */ }
          <Row className="show-grid">
          {
            this.props.proxies.map((proxy, index) =>
              <Col md={6} key={index}>
                <div style={{ backgroundColor: 'white' }} style={{ textAlign: 'center'}}>
                  <h4>{ proxy.icon } { proxy.name }</h4>
                  <div style={{ width: 142, height: 142, borderRadius: 71, border: 'solid 5px #979797', display: 'inline-block', marginTop: 30, marginBottom: 30, textAlign: 'center' }}>
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                      승률<br />
                      { proxy.winningAvg * 100 } %
                    </div>
                  </div>
                  <h4>{ proxy.delegated } EOS 위임중</h4>
                  <Button bsStyle="info" bsSize="large" style={{ marginTop: 10 }} onClick={() => this.openBettingDialog(true)}>
                    지지하기 & 베팅하기
                  </Button>
                </div>
              </Col>
            )
          }
          </Row>
          { /* Game Histories */ }
          <Row className="show-grid">
          <hr />
          <div style={{ marginTop: 30, marginBottom: 30 }}>
            <h4>이전회차 결과</h4>
          </div>
          <Table>
            <thead>
              <tr>
                <th>종료 시간</th><th>승리 PROXY</th><th>총 베팅 EOS</th>
              </tr>
            </thead>
            <tbody>
            {
              this.props.games.map((item, index) =>
                <tr>
                  <td>{ DateUtil.parseDate(item["end_time"]) }</td>
                  <td>
                    {  CommonUtil.printGameResult(this.props.proxies, item["result"]) }
                  </td>
                  <td>{  CommonUtil.printTotalGameAmount(item["team1_asset"], item["team2_asset"]) }</td>
                </tr>
              )
            }
            </tbody>
          </Table>
          </Row>
        </Grid>
        <BettingDialog
          isOpenBettingDialog={this.props.isOpenBettingDialog}
          openBettingDialog={this.openBettingDialog}
          account={this.props.account}
          accountInfo={this.props.accountInfo}
          proxies={this.props.proxies}
          proxy={this.props.proxy}
          currentGame={this.props.currentGame}
        />
      </div>
    );
  }
};

const mapStateToProps = state => ({
  proxies: state.app.proxies,
  games: state.app.games,
  account: state.app.account,
  isOpenBettingDialog: state.app.isOpenBettingDialog,
  accountInfo: state.app.accountInfo,
  currentGame: state.app.currentGame,
  remainingTime: state.app.remainingTime,
  proxy: state.proxy.proxy,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Landing);
