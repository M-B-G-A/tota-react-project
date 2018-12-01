import { createAction, handleActions } from "redux-actions";

// ================================================================
// Action Type
// ================================================================
const ACTION_SET_USER_ACCOUNT = "app/ACTION_SET_USER_ACCOUNT";
const ACTION_SET_GAMES = "app/ACTION_SET_GAMES";
// ================================================================
// Action Creator
// ================================================================
export const setUserAccount = createAction(ACTION_SET_USER_ACCOUNT, account => account);
export const setGames = createAction(ACTION_SET_GAMES, games => games);

// initial state
const initialState = {
  account: null,
  proxies: [
    {
      name: "Chinese",
      account: "totaproxyno1",
    },
    {
      name: "America",
      account: "totaproxyno2",
    }
  ],
  games: [],
};

const appReducer = handleActions({
  [ACTION_SET_USER_ACCOUNT]: (state, { payload: account }) => ({
    ...state,
    account: account
  }),
  [ACTION_SET_GAMES]: (state, { payload: games }) => ({
    ...state,
    games: games
  }),
}, initialState);

export default appReducer;
