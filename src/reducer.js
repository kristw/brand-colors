import Types from './actionTypes';
import brandsData from './data/brands.json';
import { shuffle } from 'lodash/fp';

const brands = shuffle(brandsData);
const PAGE_SIZE = 9;

const reducer = (state = {
  seen: 0,
  score: 0,
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
        .map(brand => ({
          open: false,
          score: null,
          brand
        }));
      nextState = {
        ...state,
        cells,
        index: state.index + PAGE_SIZE
      };
      break;
    case Types.FLIP:
      {
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
      }
      break;
    case Types.SCORE:
      {
        const { index, score } = action.payload;
        const newCells = state.cells.concat();
        newCells[index] = {
          ...state.cells[index],
          score,
        };
        nextState = {
          ...state,
          seen: state.seen + 1,
          score: state.score + score,
          cells: newCells
        };
      }
      break;
  }
  return nextState;
};

export default reducer;
