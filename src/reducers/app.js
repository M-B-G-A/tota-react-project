import { createAction, handleActions } from "redux-actions";

// ================================================================
// Action Type
// ================================================================
const ACTION_SET_USER_ACCOUNT = "app/ACTION_SET_USER_ACCOUNT";
const ACTION_SET_USER_ACCOUNT_INFO = "app/ACTION_SET_USER_ACCOUNT_INFO";
const ACTION_SET_GAMES = "app/ACTION_SET_GAMES";
const ACTION_SET_PROXY_INFO = "app/ACTION_SET_PROXY_INFO";
const ACTION_SET_DIVIDEND_LIST = "app/ACTION_SET_DIVIDEND_LIST";
const ACTION_OPEN_BETTING_DIALOG = "app/ACTION_OPEN_BETTING_DIALOG";
const ACTION_SET_CURRENT_GAME = "app/ACTION_SET_CURRENT_GAME";
const ACTION_UPDATE_PROXY_PRODUCERS = "app/ACTION_UPDATE_PROXY_PRODUCERS";
const ACTION_UPDATE_REMAINING_TIME = "app/ACTION_UPDATE_REMAINING_TIME";
const ACTION_SET_USER_SITE_LANGUAGE = "app/ACTION_SET_USER_SITE_LANGUAGE";

const ACTION_OPEN_DIALOG = "app/ACTION_OPEN_DIALOG";
const ACTION_SET_DIALOG_MESSAGE = "app/ACTION_SET_DIALOG_MESSAGE";
const ACTION_SET_SELECTED_PROXY = "app/ACTION_SET_SELECTED_PROXY"

const ACTION_SET_CURRENT_GAME_AMOUNT = "app/ACTION_SET_CURRENT_GAME_AMOUNT";
// ================================================================
// Action Creator
// ================================================================
export const setUserAccount = createAction(ACTION_SET_USER_ACCOUNT, account => account);
export const setUserAccountInfo = createAction(ACTION_SET_USER_ACCOUNT_INFO, accountInfo => accountInfo);
export const setGames = createAction(ACTION_SET_GAMES, games => games);
export const setProxyInfo = createAction(ACTION_SET_PROXY_INFO, ({ account, delegated, producers, icon, winningAvg, dividendRate }) => ({ account, delegated, producers, icon, winningAvg, dividendRate }))
export const setDividendList = createAction(ACTION_SET_DIVIDEND_LIST, list => list);
export const openBettingDialog = createAction(ACTION_OPEN_BETTING_DIALOG, open => open);
export const setCurrentGame = createAction(ACTION_SET_CURRENT_GAME, game => game);
export const updateProxyProducers = createAction(ACTION_UPDATE_PROXY_PRODUCERS, ({ account, producers }) => ({ account, producers }))
export const updateRemainingTime = createAction(ACTION_UPDATE_REMAINING_TIME, time => time);
export const setUserSiteLanguage = createAction(ACTION_SET_USER_SITE_LANGUAGE, language => language);

export const openDialog = createAction(ACTION_OPEN_DIALOG, open => open);
export const setDialogMessage = createAction(ACTION_SET_DIALOG_MESSAGE, ({ title, content }) => ({ title, content }));

export const setSelectedProxy = createAction(ACTION_SET_SELECTED_PROXY, (proxy) => (proxy));

export const setCurrentGameAmount = createAction(ACTION_SET_CURRENT_GAME_AMOUNT, (amount) => (amount));
// initial state
const initialState = {
  account: null, // Scatter
  accountInfo: null, // Detail Info
  proxies: [
    {
      name: "East",
      icon: "🇨🇳",
      account: "totaproxyno1",
      delegated: 0.0,
      winningAvg: 0,
      producers: [],
      dividendRate: 0.0,
    },
    {
      name: "West",
      icon: "🇺🇸",
      account: "totaproxyno2",
      delegated: 0.0,
      winningAvg: 0,
      producers: [],
      dividendRate: 0.0,
    }
  ],
  currentGame: 0,
  games: [],
  dividendList: [], // 나의 배당 내역
  isOpenBettingDialog: false,
  remainingTime: 0,
  userSiteLanguage: navigator.language.split('-')[0],
  siteLanguages: ["ko", "en"], // 지원하는 사이트 언어들
  dialogMessage: {
    title: "",
    content: "",
  },
  isOpenDialog: false, // Alert
  selectedProxy: null,
  currentGameAmount: 0, // 나의 총 베팅 EOS Amount
};

const appReducer = handleActions({
  [ACTION_SET_USER_ACCOUNT]: (state, { payload: account }) => ({
    ...state,
    account: account
  }),
  [ACTION_SET_USER_ACCOUNT_INFO]: (state, { payload: accountInfo }) => ({
    ...state,
    accountInfo: accountInfo
  }),
  [ACTION_SET_GAMES]: (state, { payload: games }) => ({
    ...state,
    games: games
  }),
  [ACTION_SET_PROXY_INFO]: (state, { payload }) => ({
    ...state,
    proxies: state.proxies.map((proxy) => proxy.account === payload.account ? {
      name: proxy.name,
      account: proxy.account,
      icon: proxy.icon,
      winningAvg: payload.winningAvg,
      delegated: payload.delegated,
      dividendRate: payload.dividendRate,
      producers: payload.producers,
    } : proxy)
  }),
  [ACTION_UPDATE_PROXY_PRODUCERS]: (state, { payload }) => ({
    ...state,
    proxies: state.proxies.map((proxy) => proxy.account === payload.account ? {
      name: proxy.name,
      account: proxy.account,
      icon: proxy.icon,
      winningAvg: proxy.winningAvg,
      delegated: proxy.delegated,
      dividendRate: proxy.dividendRate,
      producers: payload.producers,
    } : proxy)
  }),
  [ACTION_SET_DIVIDEND_LIST]: (state, { payload: list }) => ({
    ...state,
    dividendList: list
  }),
  [ACTION_OPEN_BETTING_DIALOG]: (state, { payload: open }) => ({
    ...state,
    isOpenBettingDialog: open
  }),
  [ACTION_SET_CURRENT_GAME]: (state, { payload: currentGame }) => ({
    ...state,
    currentGame: currentGame
  }),
  [ACTION_UPDATE_REMAINING_TIME]: (state, { payload: time }) => ({
    ...state,
    remainingTime: time,
  }),
  [ACTION_SET_USER_SITE_LANGUAGE]: (state, { payload: language }) => ({
    ...state,
    userSiteLanguage: language,
  }),
  [ACTION_OPEN_DIALOG]: (state, { payload: open }) => ({
    ...state,
    isOpenDialog: open,
  }),
  [ACTION_SET_DIALOG_MESSAGE]: (state, { payload: dialogMessage }) => ({
    ...state,
    dialogMessage: dialogMessage,
  }),
  [ACTION_SET_SELECTED_PROXY]: (state, { payload: proxy }) => ({
    ...state,
    selectedProxy: proxy,
  }),
  [ACTION_SET_CURRENT_GAME_AMOUNT]: (state, { payload: amount }) => ({
    ...state,
    currentGameAmount: amount,
  }),
}, initialState);

export default appReducer;
