import React from "react";
import { Button, Table } from "react-bootstrap";
import { CommonUtil, DateUtil } from "../../utils";
import { FormattedHTMLMessage } from "react-intl";

const List = (props) => {
  const onReceiveButtonClicked = (gameKey) => {
    props.onReceiveButtonClicked(gameKey);
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th><FormattedHTMLMessage id="bet_history_period" /></th>
            <th><FormattedHTMLMessage id="bet_history_time" /></th>
            <th><FormattedHTMLMessage id="bet_history_winning" /></th>
            <th><FormattedHTMLMessage id="bet_history_total" /></th>
            <th><FormattedHTMLMessage id="bet_history_my" /></th>
            <th><FormattedHTMLMessage id="bet_history_rewords" /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          // props.dividendList.length === 0 ? null : (
          props.dividendList.map((item, index) =>
            // {item["game"] === undefined ? null : (
            <tr key={index}>
              <td>{ item["game_key"] + 1 }</td>
              <td>{ DateUtil.parseDate(item["game"]["end_time"]) }</td>
              <td>{ CommonUtil.printGameResult(props.proxies, item["game"]["result"]) }</td>
              <td>{ CommonUtil.printTotalGameAmount(item["game"]["team1_asset"], item["game"]["team2_asset"]) }</td>
              <td>{ item["amount"] }</td>
              <td>{ (props.proxies[item.side - 1].dividendRate * 1.0) * CommonUtil.getAmount(item.amount, null) } EOS</td>
              <td>{ item["status"] === 1 ? (<Button disabled><FormattedHTMLMessage id="bet_history_claim_btn" /></Button>) : (<Button onClick={() => onReceiveButtonClicked(item["game_key"])} ><FormattedHTMLMessage id="bet_history_claim_btn" /></Button>) }</td>
            </tr>
           )
          }
        </tbody>
      </Table>
    </div>
  );
};

export default List;
