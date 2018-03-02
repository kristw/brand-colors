import Actions from './actions';
import Component from './App';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const {
    cells,
    seen,
    score,
  } = state;

  return {
    cells,
    seen,
    score,
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
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
