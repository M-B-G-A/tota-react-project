import React from "react";
import { Grid, Row, Col, Jumbotron, Button, Thumbnail, ProgressBar, Table } from "react-bootstrap";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { CommonUtil, DateUtil } from "../../utils";

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

const List = (props) => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>회차</th>
            <th>종료 시간</th>
            <th>승리 PROXY</th>
            <th>총 베팅 EOS</th>
            <th>나의 베팅 EOS</th>
            <th>나의 배당 EOS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          // props.dividendList.length === 0 ? null : (
          props.dividendList.map((item, index) =>
            // {item["game"] === undefined ? null : (
<tr>
              <td>{ item["game_key"] }</td>
              {/* <td>{ DateUtil.parseDate(item["game"]["end_time"]) }</td> */}
              {/* <td>{ CommonUtil.printGameResult(props.proxies, item["game"]["result"]) }</td> */}
              {/* <td>{ CommonUtil.printTotalGameAmount(item["game"]["team1_asset"], item["game"]["team2_asset"]) }</td> */}
              <td>{ item["amount"] }</td>
            </tr>
           )
          }
        </tbody>
      </Table>
    </div>
  );
};

export default List;
