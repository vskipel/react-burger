import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socket-middleware';

import {
    WS_CONNECTION_START_FEED,
    WS_CONNECTION_START_PROFILE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_DISCONNECT
} from './actions/ws-constants';

const wsActionsFeed = {
    wsInit: WS_CONNECTION_START_FEED,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
    disconnect: WS_DISCONNECT
};
const wsActionsProfile = {
    wsInit: WS_CONNECTION_START_PROFILE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
    disconnect: WS_DISCONNECT
};


const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(
            socketMiddleware(wsActionsFeed),
            socketMiddleware(wsActionsProfile),
            thunk
        )
    )
);

export default store;