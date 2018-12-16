import React from "react";
import { Grid, Row } from "react-bootstrap";
import { FormattedHTMLMessage } from "react-intl";

const styles = {
  root: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    display: 'flex',
  }
};

const Info = (props) => {
  return (
    <div style={styles.root}>
      <Grid>
        <Row style={{ marginBottom: 30 }}>
         <img src= { process.env.PUBLIC_URL + "Logo_line.png" } alt="" style={{ width: 300, height: 90 }} />
        </Row>
        <Row>
          <p>
            <FormattedHTMLMessage id="info_desc1" />
          </p>
          <p>
            <FormattedHTMLMessage id="info_desc2" />
          </p>
          <p>
            <FormattedHTMLMessage id="info_desc3" />
          </p>
          <p>
            <FormattedHTMLMessage id="info_desc_final" />
          </p>
        </Row>
      </Grid>
    </div>
  );
};

export default Info;
