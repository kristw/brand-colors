/* global ga:true */

import Actions from './actions';
import Component from './App';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const {
    actions,
    catalog,
    page,
    cells,
    flipped,
    answered,
    score,
  } = state;

  return {
    actions: actions.slice(1),
    catalog,
    page,
    cells,
    flipped,
    answered,
    score,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInit() {
      dispatch(Actions.buildBoard());
      ga('send', 'event', 'build_board', 'init', '', 0);
    },
    onCellClick(index, cell) {
      if (!cell.open) {
        dispatch(Actions.flip(index));
        ga('send', 'event', 'flip', 'box', cell.brand.name);
      }
    },
    onCellScore(index, score, cell) {
      dispatch(Actions.score({ index, score }));
      if(score > 0) {
        ga('send', 'event', 'score', 'correct', cell.brand.name);
      } else {
        ga('send', 'event', 'score', 'wrong', cell.brand.name);
      }
    },
    onNextPage(page) {
      dispatch(Actions.buildBoard());
      ga('send', 'event', 'build_board', 'next_page', '', page);
    },
    onGameEnd(stats) {
      ga('send', 'event', 'game_end', stats.score + '', JSON.stringify(stats), stats.score);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
