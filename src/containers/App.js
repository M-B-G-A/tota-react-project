import React, { Component }  from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import * as routes from "../constants";
import Header from "./Header";
import Footer from "./Footer";
import Landing from "../components/Landing";
import Dividend from "../components/dividend/Dividend"
import Proxy from "../components/proxy/Proxy";
import Setting from "../components/setting/Setting";

const styles = {
  wrapper: {
    display: 'table',
    minHeight: '100%',
    height: '100vh',
    width: '100%',
    backgroundColor: 'white',
  },
  body: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    display: 'table-row',
    height: '60px',
    width: '100%',
  },
  footer: {
    display: 'table-row',
    width: '100%',
    height: '60px',
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div style={styles.wrapper}>
        <div style={styles.header}>
          <Header />
        </div>
          <div style={styles.body}>
            <Switch>
              <Redirect exact from={routes.HOME} to={routes.LANDING} />
              <Route exact strict path={routes.LANDING} component={Landing} />
              <Route exact strict path={routes.DIVIDEND} component={Dividend} />
              <Route exact strict path={routes.PROXY} component={Proxy} />
              <Route exact strict path={routes.SETTING} component={Setting} />
            </Switch>
          </div>
          <div style={styles.footer}>
          <Footer />
        </div>
        </div>
      </Router>
    );
  }
};

export default App;
