import Types from './actionTypes';
import brandsData from './data/brands.json';
import { shuffle } from 'lodash/fp';

const brands = shuffle(brandsData);
const PAGE_SIZE = 9;

const reducer = (state = {
  brands,
  index: 0,
  cells: [],
}, action) => {
  const { payload } = action;

  let nextState = state;
  switch (action.type) {
    case Types.INIT:
      nextState = { ...state };
      break;
    case Types.BUILD_BOARD:
      const cells = state.brands
        .slice(state.index, state.index + PAGE_SIZE)
        .map(brand => ({ open: false, brand }));
      nextState = {
        ...state,
        cells,
        index: state.index + PAGE_SIZE
      };
      break;
    case Types.FLIP:
      const index = action.payload;
      const newCells = state.cells.concat();
      newCells[index] = {
        ...state.cells[index],
        open: true,
      };
      nextState = {
        ...state,
        cells: newCells
      };
      break;
  }
  return nextState;
};

export default reducer;
