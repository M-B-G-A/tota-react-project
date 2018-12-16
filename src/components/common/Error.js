import React from "react";
import { Jumbotron, Button } from "react-bootstrap"
import { withRouter } from "react-router"
import * as routes from "../../constants"
import { FormattedHTMLMessage } from "react-intl"

const Error = (props) => {
  return (
    <div style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
      <Jumbotron style={{ width: '100%', paddingLeft: '50px'  }}>
        <div style={{ paddingRight: '50px' }}>
          <img src={ process.env.PUBLIC_URL + "Logo_line.png"} style={{ width: '50%', height: '50%' }} alt='' />
        </div>
        <div>
          <h1><FormattedHTMLMessage id="error_title" /></h1>
          <p>
            <FormattedHTMLMessage id="error_subtitle" />
          </p>
          <p>
            <Button bsStyle="primary" onClick={() => {props.history.push(routes.HOME)}}>
              <FormattedHTMLMessage id="error_button" />
            </Button>
          </p>
        </div>
      </Jumbotron>
    </div>
  );
};

export default withRouter(Error);
