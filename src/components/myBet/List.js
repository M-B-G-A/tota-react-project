import React from "react";
import { Button, Table } from "react-bootstrap";
import { CommonUtil, DateUtil } from "../../utils";

const List = (props) => {
  const onReceiveButtonClicked = (gameKey) => {
    props.onReceiveButtonClicked(gameKey);
  }

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
              <td>{ item["game_key"] + 1 }</td>
              <td>{ DateUtil.parseDate(item["game"]["end_time"]) }</td>
              <td>{ CommonUtil.printGameResult(props.proxies, item["game"]["result"]) }</td>
              <td>{ CommonUtil.printTotalGameAmount(item["game"]["team1_asset"], item["game"]["team2_asset"]) }</td>
              <td>{ item["amount"] }</td>
              <td>{ (props.proxies[item.side - 1].dividendRate * 1.0) * CommonUtil.getAmount(item.amount, null) } EOS</td>
              <td>{ item["status"] === 1 ? (<Button disabled>수령하기</Button>) : (<Button onClick={() => onReceiveButtonClicked(item["game_key"])} >수령하기</Button>) }</td>
            </tr>
           )
          }
        </tbody>
      </Table>
    </div>
  );
};

export default List;
