import Actions from './actions';
import Component from './App';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const {
    catalog,
    cells,
    flipped,
    seen,
    score,
    page,
    actions,
  } = state;

  return {
    actions: actions.slice(1),
    catalog,
    cells,
    flipped,
    seen,
    score,
    hasUnopened: seen < page * catalog.pageSize,
    hasNextPage: catalog.hasNextPage(page)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInit() {
      dispatch(Actions.buildBoard());
    },
    onCellClick(index, cell) {
      if (!cell.open) {
        dispatch(Actions.flip(index));
      }
    },
    onCellScore(index, score) {
      dispatch(Actions.score({ index, score }));
    },
    onNextPage() {
      dispatch(Actions.buildBoard());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
