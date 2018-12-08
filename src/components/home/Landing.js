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
import * as proxyActions from "../../reducers/proxy";

const styles = {
  root: {
    width: '60%',
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

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 게임 가져오기
    eos.getTableRows({"scope": "totatestgame", "code": "totatestgame", "table": "games2", "json": true, "reverse": true}).then((res) => {
      const games = res.rows;
      this.props.appActions.setGames(games);
      // 현재 진행중인 게임 회차
      this.props.appActions.setCurrentGame(games[0]["key"]);
      const totalGameCount = games.length - 1; // 총 게임 수
      this.props.proxies.map((item, index) => {
        // 현재 게임 예상 배당률
        const dividendRate = CommonUtil.getDividendRate(index, games[0]['team1_asset'], games[0]['team2_asset'])
        // Proxy 승률
        const loadProxyRate = async function () {
          const proxy1Info = await eosMainnet.getAccount("totaproxyno1");
          const proxy2Info = await eosMainnet.getAccount("totaproxyno2");
          const producerList = await eosMainnet.getProducers(true, "", 21);
          console.log(producerList);
          const producers1 = proxy1Info["voter_info"]["producers"];
          const array1 = [];
          for (const i of producers1) {
            array1.push(i)
          }
          console.log(array1);
          const producers2 = proxy2Info["voter_info"]["producers"];
          const array2 = [];
          for (const i of producers2) {
            array2.push(i)
          }
          console.log(array2);
          let count1 = 0;
          let count2 = 0;

          for(let producer of producerList.rows) {
            if(producers1.indexOf(producer.owner) != -1){
              count1 += 1;
            }
            if(producers2.indexOf(producer.owner) != -1){
              count2 += 1;
            }
          }
          return [count1/21, count2/21]
        };
        loadProxyRate().then(rateArr => {
          const winningAvg = rateArr[index];
        
        // Proxy Account
        eos.getAccount(item.account).then(res => {
          const lastVoteWeight = res["voter_info"]["last_vote_weight"];
          const delegated = lastVoteWeight / Math.pow(2, Math.round((new Date().getTime() / 1000 - 946684800)/(24 * 3600 * 7)) / 52) / 10000
          this.props.appActions.setProxyInfo({ account: item.account, icon: item.icon, delegated: delegated, producers: res["voter_info"]['producers'], winningAvg: winningAvg, dividendRate: dividendRate })
        })

        });
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
    if (this.props.remainingTime === 0) {
      return
    }
    if (this.props.remainingTime !== null) {
      const remain = this.props.remainingTime;
      const D = Math.floor(remain / 86400);
      const H = Math.floor((remain - D * 86400) / 3600 % 3600);
      const M = Math.floor((remain - H * 3600) / 60 % 60);
      const S = Math.floor((remain - M * 60) % 60);

      return H + "시간 " + M + "분 " + S + "초";
    }
  }

  openBettingDialog = (open, proxy) => {
    if (this.props.account) {
      if (open === true) {
        this.props.appActions.setSelectedProxy(proxy);
      }
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
              <ProgressBar bsStyle="info" active now={1800 - this.props.remainingTime} max={1800} />
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
          <hr />
          { /* Proxy Information */ }
          <Row className="show-grid" style={{ marginBottom: 50 }}>
          {
            this.props.proxies.map((proxy, index) =>
              <Col md={6} key={index}>
                <div style={{ backgroundColor: 'white' }} style={{ textAlign: 'center'}}>
                  <h4>{ proxy.icon } { proxy.name }</h4>
                  <div style={{ width: 142, height: 142, borderRadius: 71, border: 'solid 5px #979797', display: 'inline-block', marginTop: 30, marginBottom: 30, textAlign: 'center' }}>
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                      <div>
                        현재      승률<br />
                        <h4>{ proxy.winningAvg * 100 } %</h4>
                      </div>
                    </div>
                  </div>
                  <h4>{ proxy.delegated.toFixed(4) } EOS 위임중</h4>
                  <Button bsStyle="info" bsSize="large" style={{ marginTop: 50, marginBottom: 10, width: 200 }} onClick={() => this.openBettingDialog(true, proxy)}>
                    베팅하기
                  </Button>
                  <div>승리시 { proxy.dividendRate } 배 획득 예상</div>
                </div>
              </Col>
            )
          }
          </Row>
          <hr />
          { /* Game Histories */ }
          <Row className="show-grid">
          <div style={{ marginTop: 30, marginBottom: 30 }}>
            <h4>이전회차 결과</h4>
          </div>
          <Table>
            <thead>
              <tr>
                <th>회차</th><th>종료 시간</th><th>승리 PROXY</th><th>총 베팅 EOS</th>
              </tr>
            </thead>
            {
              this.props.games.filter((g, i) => i !== 0).map((item, index) =>
              (
                  <tbody>
                    <tr>
                      <td>{ item.key + 1 }</td>
                      <td>{ DateUtil.parseDate(item.end_time) }</td>
                      <td>
                        {  CommonUtil.printGameResult(this.props.proxies, item.result) }
                      </td>
                      <td>{  CommonUtil.printTotalGameAmount(item.team1_asset, item.team2_asset) }</td>
                    </tr>
                  </tbody>
                ),)
              }
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
          selectedProxy={this.props.selectedProxy}
          setUserProxy={this.props.proxyActions.setUserProxy}
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
  selectedProxy: state.app.selectedProxy,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
  proxyActions: bindActionCreators(proxyActions, dispatch),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Landing);
