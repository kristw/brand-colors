import Actions from './actions';
import Component from './App';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const {
    cells,
  } = state;

  return {
    cells,
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
