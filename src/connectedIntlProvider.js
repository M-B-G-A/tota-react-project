import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import * as locale from './locales'

// This function will map the current redux state to the props for the component that it is "connected" to.
// When the state of the redux store changes, this function will be called, if the props that come out of
// this function are different, then the component that is wrapped is re-rendered.

const mapStateToProps = (state) => {
  /*
    navigator.language는 사용자 브라우저의 언어를 가져온다.
    예를 들어 "en-US", "fr-FR", "en", "fr" 이러한 형식의 값을 가지고 있기 때문에 아래와 같이 분할한다.
    참고 : https://developer.mozilla.org/ko/docs/Web/API/NavigatorLanguage/language
  */
  const lang = state.app.userSiteLanguage === null ? navigator.language.split('-')[0] || 'ko' : state.app.userSiteLanguage;
  return {
    locale: lang,
    messages: locale[lang],
    key: lang,
  };
}
const ConnectedIntlProvider = connect(mapStateToProps)(IntlProvider);
export default ConnectedIntlProvider;
