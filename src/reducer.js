import Catalog from './models/Catalog';
import Cell from './models/Cell';
import Types from './actionTypes';
import brandsData from './data/brands.json';

const reducer = (state = {
  flipped: 0,
  seen: 0,
  score: 0,
  catalog: new Catalog(brandsData),
  page: 0,
  cells: [],
  actions: [],
}, action) => {
  const { payload } = action;

  let nextState = state;
  switch (action.type) {
    case Types.BUILD_BOARD:
      nextState = {
        ...state,
        cells: state.catalog
          .getPage(state.page)
          .map(b => new Cell(b)),
        page: state.page + 1
      };
      break;
    case Types.FLIP:
      {
        const index = payload;
        const newCells = state.cells.concat();
        newCells[index] = state.cells[index].setOpen(true);
        nextState = {
          ...state,
          flipped: state.flipped + 1,
          cells: newCells
        };
      }
      break;
    case Types.SCORE:
      {
        const { index, score } = payload;
        const newCells = state.cells.concat();
        newCells[index] = state.cells[index].setScore(score);
        nextState = {
          ...state,
          seen: state.seen + 1,
          score: state.score + score,
          cells: newCells
        };
      }
      break;
    default:
      break;
  }

  // Add logging
  if (action.type === Types.BUILD_BOARD
    || action.type === Types.FLIP
    || action.type === Types.SCORE) {
    const newActions = state.actions.concat();
    newActions.push({
      time: new Date(),
      score: state.score,
      seen: state.seen,
      action,
    });
    return { ...nextState, actions: newActions };
  }

  return nextState;
};

export default reducer;
