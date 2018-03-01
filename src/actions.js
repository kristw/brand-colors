import Types from './actionTypes';
import { createAction } from 'redux-actions';
import { mapKeys } from 'lodash-es';

export default mapKeys(Types, (value, key) => createAction(value));
