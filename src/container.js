import Actions from './actions';
import Component from './App';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const {
    cells,
    seen,
    score,
    brands,
    index
  } = state;

  return {
    cells,
    seen,
    score,
    hasNextPage: index < brands.length
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInit() {
      dispatch(Actions.buildBoard());
    },
    onCellClick(index) {
      dispatch(Actions.flip(index));
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
