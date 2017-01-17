import type { Action } from '../actions/types';
import { SET_STORELOCATION } from '../actions/storelocation';

export type State = {
    storeValue: Object
}

const initialState = {
    storeValue: {
        StoreName: '',
        StoreLocationID: 0,
        CharData:{realTimeSales:[]}
    },
};

export default function (state: State = initialState, action: Action): State {
    if (action.type === SET_STORELOCATION) {
        return {
            ...state,
            storeValue: action.payload,
        };
    }
    return state;
}