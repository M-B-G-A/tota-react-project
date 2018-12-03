import { createAction, handleActions } from "redux-actions";

// ================================================================
// Action Type
// ================================================================
const ACTION_SET_USER_PROXY = "proxy/ACTION_SET_USER_PROXY";
const ACTION_SET_PROXY_PRODUCERS = "proxy/ACTION_SET_PROXY_PRODUCERS";
const ACTION_UPDATE_PROXY_PRODUCER_IMAGE = "proxy/ACTION_UPDATE_PROXY_PRODUCER_IMAGE";
// ================================================================
// Action Creator
// ================================================================
export const setUserProxy = createAction(ACTION_SET_USER_PROXY, proxy => proxy);
export const setProxyProducers = createAction(ACTION_SET_PROXY_PRODUCERS, producers => producers);
export const updateProxyProducerImage = createAction(ACTION_UPDATE_PROXY_PRODUCER_IMAGE, ({name, image}) => ({name, image}));

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
  [ACTION_UPDATE_PROXY_PRODUCER_IMAGE]: (state, { payload }) => ({
    ...state,
    producers: state.producers.map((producer) => producer.name === payload.name ? {
      name: producer.name,
      image: payload.image,
    } : producer)
  }),
}, initialState);

export default proxyReducer;
