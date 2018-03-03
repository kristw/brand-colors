import Catalog from './models/Catalog';
import Cell from './models/Cell';
import Types from './actionTypes';
import brandsData from './data/brands.json';

const reducer = (state = {
  seen: 0,
  score: 0,
  catalog: new Catalog(brandsData),
  page: 0,
  cells: [],
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
        const index = action.payload;
        const newCells = state.cells.concat();
        newCells[index] = state.cells[index].setOpen(true);
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
        newCells[index] = state.cells[index].setScore(score);
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
