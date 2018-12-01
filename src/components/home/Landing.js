import React, { Component } from "react";
import { Grid, Row, Col, Jumbotron, Button, Thumbnail, ProgressBar, Table } from "react-bootstrap";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { Doughnut } from "react-chartjs";
import { eos } from "../../apis/eos";
import DateUtil from "../../utils/DateUtil";
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
		value: 100,
		color:"#F7464A",
		highlight: "#FF5A5E",
		label: "Red"
	},
	{
		value: 80,
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: "Green"
	},
];

class Landing extends Component {
  componentDidMount() {
    eos.getTableRows(true, "totagamelist", "totagamelist", "games2", "key").then((res) => {
      this.props.appActions.setGames(res.rows);
    });

    this.props.proxies.map((item) => {
      eos.getAccount(item.account).then(res => {
        const lastVoteWeight = res["voter_info"]["last_vote_weight"];
        const delegated = lastVoteWeight / Math.pow(2, Math.round((new Date().getTime()/1000 - 946684800)/(24 * 3600 * 7)) / 52) / 10000
        this.props.appActions.setProxyInfo({ account: item.account, delegated: delegated, producers: res["voter_info"]['producers'] })
      })
    });
  }

  printGameResult = (result) => {
    if (result === 0) {
      return "무승부";
    } else if (result === 1) {
      return this.props.proxies[0].name;
    } else if (result === 2) {
      return this.props.proxies[1].name;
    }
  }

  printTotalAmount = (teamAsset1, teamAsset2) => {
    const amount1 = teamAsset1.split(" ")[0] * 1;
    const amount2 = teamAsset2.split(" ")[0] * 1;
    return (amount1 + amount2) + " EOS";
  }

  openBettingDialog = (open) => {
    this.props.appActions.openBettingDialog(open);
  }

  render() {
    return (
      <div style={styles.root}>
        <Grid>
          <Row className="show-grid" style={styles.row}>
            74회차 종료까지
          </Row>
          <Row className="show-grid" style={styles.row}>
            <h3>17시간 20분 22초</h3>
          </Row>
          <Row className="show-grid">
            <Col>
              <ProgressBar now={60} />
            </Col>
          </Row>
          { /* Proxy Information */ }
          <Row className="show-grid">
          {
            this.props.proxies.map((item, index) =>
              <Col md={6} key={index}>
                <div style={{ backgroundColor: 'white' }} style={{ textAlign: 'center'}}>
                  <h4>{ item.icon } { item.name }</h4>
                  <Doughnut data={data1} options={{ segmentShowStroke: false }} style={{ marginTop: 20, marginBottom: 10 }}/>
                  <h4>{ item.delegated } EOS 위임중</h4>
                  <Button bsStyle="primary" style={{ marginTop: 10 }} onClick={() => this.openBettingDialog(true)}>
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
                    { this.printGameResult(item["result"]) }
                  </td>
                  <td>{ this.printTotalAmount(item["team1_asset"], item["team2_asset"]) }</td>
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
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Landing);