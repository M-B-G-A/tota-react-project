import React from "react";
import { Grid, Row, Col, Jumbotron, Button, Thumbnail, ProgressBar, Table } from "react-bootstrap";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";

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

const Dividend = (props) => {
  return (
    <div style={styles.root}>
      <Grid>
        <Row className="show-grid">
        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <h4>이전회차 결과</h4>
        </div>
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
            <tr>
              <td>1</td>
              <td>2018.12.31 23:00:00</td>
              <td>Chinese</td>
              <td>3,4217.2325</td>
              <td>3,4217.2325</td>
              <td>5</td>
              <td><Button>수령하기</Button></td>
            </tr>
          </tbody>
        </Table>
        </Row>
      </Grid>
    </div>
  );
};

export default Dividend;
