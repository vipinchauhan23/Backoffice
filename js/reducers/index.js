
import { combineReducers } from 'redux';

import drawer from './drawer';
import cardNavigation from './cardNavigation';
import poscode from './poscode';
import storelocation from './storelocation';
import list from './list';

export default combineReducers({

  drawer,
  poscode,
  list,
  storelocation,
  cardNavigation,

});
