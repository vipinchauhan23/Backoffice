
import type, { Action } from './types';

export const SET_STORELOCATION = 'SET_STORELOCATION';

export function setStorelocation(storeLocation:Object):Action {
  return {
    type: SET_STORELOCATION,
    payload: storeLocation,
  };
}