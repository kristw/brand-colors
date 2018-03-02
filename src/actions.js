import { camelCase, flow, mapKeys, mapValues } from 'lodash/fp';

import Types from './actionTypes';
import { createAction } from 'redux-actions';

const actions = flow(
  mapKeys(key => camelCase(key)),
  mapValues(value => createAction(value)),
)(Types);

export default actions;
