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
// ================================================================
// Action Creator
// ================================================================
export const setUserAccount = createAction(ACTION_SET_USER_ACCOUNT, account => account);
export const setUserAccountInfo = createAction(ACTION_SET_USER_ACCOUNT_INFO, accountInfo => accountInfo);
export const setGames = createAction(ACTION_SET_GAMES, games => games);
export const setProxyInfo = createAction(ACTION_SET_PROXY_INFO, ({ account, delegated, producers, icon, winningAvg }) => ({ account, delegated, producers, icon, winningAvg }))
export const setDividendList = createAction(ACTION_SET_DIVIDEND_LIST, list => list);
export const openBettingDialog = createAction(ACTION_OPEN_BETTING_DIALOG, open => open);
export const setCurrentGame = createAction(ACTION_SET_CURRENT_GAME, game => game);
export const updateProxyProducers = createAction(ACTION_UPDATE_PROXY_PRODUCERS, ({ account, producers }) => ({ account, producers }))
export const updateRemainingTime = createAction(ACTION_UPDATE_REMAINING_TIME, time => time);

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
    },
    {
      name: "West",
      icon: "🇺🇸",
      account: "totaproxyno2",
      delegated: 0.0,
      winningAvg: 0,
      producers: [],
    }
  ],
  currentGame: null,
  games: [],
  dividendList: [], // 나의 배당 내역
  isOpenBettingDialog: false,
  remainingTime: null,
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
}, initialState);

export default appReducer;
