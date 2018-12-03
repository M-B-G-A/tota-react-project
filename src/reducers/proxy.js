import { createAction, handleActions } from "redux-actions";

// ================================================================
// Action Type
// ================================================================
const ACTION_SET_USER_PROXY = "proxy/ACTION_SET_USER_PROXY";
const ACTION_SET_PROXY_PRODUCERS = "proxy/ACTION_SET_PROXY_PRODUCERS";
// ================================================================
// Action Creator
// ================================================================
export const setUserProxy = createAction(ACTION_SET_USER_PROXY, proxy => proxy);
export const setProxyProducers = createAction(ACTION_SET_PROXY_PRODUCERS, producers => producers);

// initial state
const initialState = {
  proxy: null, // 지지하는 프록시
  producers: [], // 프록시 프로듀서들
};

const proxyReducer = handleActions({
  [ACTION_SET_USER_PROXY]: (state, { payload: proxy }) => ({
    ...state,
    proxy: proxy
  }),
  [ACTION_SET_PROXY_PRODUCERS]: (state, { payload: producers }) => ({
    ...state,
    producers: producers
  }),
}, initialState);

export default proxyReducer;
