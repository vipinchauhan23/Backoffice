
import type, { Action } from '../actions/types';
import { SET_POS } from '../actions/poscode';

export type State = {
    posValue: string
}

const initialState = {
  posValue: '',
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_POS) {
    return {
      ...state,
      posValue: action.payload,
    };
  }
  return state;
}
