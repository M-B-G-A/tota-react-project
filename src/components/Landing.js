import React from "react";
import { Grid, Row, Col, Jumbotron, Button, Thumbnail, ProgressBar, Table } from "react-bootstrap";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Doughnut } from "react-chartjs";

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

const data2 = [
	{
		value: 300,
		color:"#F7464A",
		highlight: "#FF5A5E",
		label: "Red"
	},
	{
		value: 50,
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: "Green"
	},
];

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
            <div style={{ backgroundColor: 'white' }} style={{ textAlign: 'center'}}>
              <h4>Chinese</h4>
              <Doughnut data={data1} options={{ segmentShowStroke: false }} style={{ marginTop: 20, marginBottom: 10 }}/>
              <h4>35,233.212 EOS 위임중</h4>
              <Button bsStyle="primary" style={{ marginTop: 10 }}>
                지지하기 & 베팅하기
              </Button>
            </div>
          </Col>
          <Col md={6}>
          <div style={{ backgroundColor: 'white' }} style={{ textAlign: 'center'}}>
             <h4>America</h4>
             <Doughnut data={data2} options={{ segmentShowStroke: false }} style={{ marginTop: 20, marginBottom: 10 }}/>
              <h4>35,233.212 EOS 위임중</h4>
              <Button bsStyle="primary" style={{ marginTop: 10, marginBottom: 10 }}>
                지지하기 & 베팅하기
              </Button>
            </div>
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
