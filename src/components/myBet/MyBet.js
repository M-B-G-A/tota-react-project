import React, { Component } from "react";
import { Grid, Row, Col, Jumbotron, Button, Thumbnail, ProgressBar, Table } from "react-bootstrap";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import * as appActions from "../../reducers/app";
import List from "../myBet/List";
import { eos } from "../../apis/eos";
import * as routes from "../../constants";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from "eosjs";
import { scatterNetwork } from "../../apis/scatter";
const styles = {
  root: {
    width: '80%',
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

class MyBet extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.account === null) {
      this.props.history.push(routes.HOME);
      return
    }

    eos.getTableRows(true, "totatestgame", "totatestgame", "games2").then((games) => {
      eos.getTableRows(true, "totatestgame", "totatestgame", "histories2").then((res) => {
        let list = res.rows.filter(item => item.user === this.props.account.name);
        this.getDividendList(games.rows, list);
      });
    });
  }

  getDividendList = (games, dividendList) => {
    var newList = [];
    for (let i in dividendList) {
      const dividend = dividendList[i]
      const game = games.filter(item => item.key === dividend["game_key"])[0];
      dividend["game"] = game;
      newList.push(dividend);
    }
    this.props.appActions.setDividendList(newList);
  }

  onReceiveButtonClicked = (gameKey) => {
    ScatterJS.plugins(new ScatterEOS());
    const scatter = ScatterJS.scatter;
    const eos = scatter.eos( scatterNetwork, Eos, { authorization: [`${this.props.account.name}@${this.props.account.authority}`] } );
    eos.contract('totatestgame').then(myaccount => {
      myaccount.dropcoin(this.props.account.name, gameKey).then(res => {
        console.log('result', res);
      });
    });
  }

  render() {
    return (
      <div style={styles.root}>
        <Grid>
          <Row className="show-grid">
          <div style={{ marginTop: 30, marginBottom: 30 }}>
            <h4>이전회차 결과</h4>
          </div>
          <List
            dividendList={this.props.dividendList}
            proxies={this.props.proxies}
            onReceiveButtonClicked={this.onReceiveButtonClicked}
          />
          </Row>
        </Grid>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  account: state.app.account,
  proxies: state.app.proxies,
  games: state.app.games,
  dividendList: state.app.dividendList,
});

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(MyBet);
