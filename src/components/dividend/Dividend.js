import React, { Component } from "react";
import { Grid, Row, Col, Jumbotron, Button, Thumbnail, ProgressBar, Table } from "react-bootstrap";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import * as appActions from "../../reducers/app";
import List from "../dividend/List";
import { eos } from "../../apis/eos";

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

class Dividend extends Component {
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.account !== nextProps.account) {
      eos.getTableRows(true, "totagamelist", "totagamelist", "games2").then((games) => {
        eos.getTableRows(true, "totagamelist", "totagamelist", "histories2").then((res) => {
          let list = res.rows.filter(item => item.user === nextProps.account.name);
          this.getDividendList(games.rows, list);
        });
      });
    }
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

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Dividend);
