import React from "react";
import { Jumbotron, Button, Thumbnail } from "react-bootstrap"
import { withRouter } from "react-router"
import * as routes from "../constants"

const Error = (props) => {
  return (
    <div style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
      <Jumbotron style={{ width: '100%', paddingLeft: '50px'  }}>
        <div style={{ paddingRight: '50px' }}>
          <img src={ process.env.PUBLIC_URL + "Logo_line.png"} style={{ width: '50%', height: '50%' }} />
        </div>
        <div>
          <h1>죄송합니다.</h1>
          <p>
            찾으시는 페이지가 없습니다.
          </p>
          <p>
            <Button bsStyle="primary" onClick={() => {props.history.push(routes.HOME)}}>
              홈으로 이동
            </Button>
          </p>
        </div>
      </Jumbotron>
    </div>
  );
};

export default withRouter(Error);
