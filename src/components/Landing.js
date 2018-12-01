import React, { Component } from "react";
import { Grid, Row, Col, Jumbotron, Button, Thumbnail, ProgressBar, Table } from "react-bootstrap";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { Doughnut } from "react-chartjs";
import { eos } from "../apis/eos";
import DateUtil from "../utils/DateUtil";

import * as appActions from "../reducers/app";

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
    console.log(teamAsset1);
    console.log(teamAsset1.split(" "));
    const amount1 = teamAsset1.split(" ")[0] * 1;
    const amount2 = teamAsset2.split(" ")[0] * 1;
    return (amount1 + amount2) + " EOS";
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
                  <h4>{item.name}</h4>
                  <Doughnut data={data1} options={{ segmentShowStroke: false }} style={{ marginTop: 20, marginBottom: 10 }}/>
                  <h4>35,233.212 EOS 위임중</h4>
                  <Button bsStyle="primary" style={{ marginTop: 10 }}>
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
      </div>
    );
  }
};

const mapStateToProps = state => ({
  proxies: state.app.proxies,
  games: state.app.games,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Landing);
