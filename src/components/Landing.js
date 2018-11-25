import React from "react";
import { Grid, Row, Col, Jumbotron, Button, Thumbnail, ProgressBar, Table } from "react-bootstrap";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";

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

const Landing = (props) => {
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
        <Row className="show-grid">
          <Col md={6}>
            <Jumbotron style={{ backgroundColor: 'white' }}>
              <h4>Chinese</h4>
              <p>
                35,233.212 EOS 위임중
              </p>
              <p>
                <Button bsStyle="primary">
                  지지하기 & 베팅하기
                </Button>
              </p>
            </Jumbotron>
          </Col>
          <Col md={6}>
            <Jumbotron style={{ backgroundColor: 'white' }}>
              <h4>America</h4>
              <p>
                35,233.212 EOS 위임중
              </p>
              <p>
                <Button bsStyle="primary">
                  지지하기 & 베팅하기
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row className="show-grid">
        <hr />
        <div style={{ marginTop: 30, marginBottom: 30 }}>
          <h4>이전회차 결과</h4>
        </div>
        <Table>
          <thead>
            <tr>
              <th>종료 시간</th>
              <th>승리 PROXY</th>
              <th>총 베팅 EOS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2018.12.31 23:00:00</td>
              <td>Chinese</td>
              <td>3,4217.2325</td>
            </tr>
            <tr>
              <td>2018.12.31 00:00:00</td>
              <td>America</td>
              <td>3,4217.2325</td>
            </tr>
            <tr>
              <td>2018.12.31 23:00:00</td>
              <td>America</td>
              <td>3,4217.2325</td>
            </tr>
          </tbody>
        </Table>
        </Row>
      </Grid>
    </div>
  );
};

export default Landing;
