import Actions from './actions';
import Component from './App';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const {
    field,
  } = state;

  return {
    field
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearch: () => {
      // dispatch(Actions.buildReport());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
