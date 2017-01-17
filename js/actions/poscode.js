
import type, { Action } from './types';

export const SET_POS = 'SET_POS';

export function setPoscode(pos: string): Action {
  return {
    type: SET_POS,
    payload: pos,
  };
}
