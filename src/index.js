import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import rootReducer from "./reducers";

import { Provider } from "react-redux";
import App from "./containers/App";

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import ConnectedIntlProvider from './connectedIntlProvider';
import { addLocaleData } from 'react-intl';

// 이 서브 라이브러리들이 내 locale 파일을 사용할 수 있게 해준다 => 또 다른 언어를 추가할 때 반드시 추가할 것!
import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';

addLocaleData([...en, ...ko])

const store = createStore(rootReducer, devToolsEnhancer());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
      <App />
    </ConnectedIntlProvider>
  </Provider>,
  document.getElementById('root')
);
