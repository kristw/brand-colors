/* global ga:true */

import Actions from './actions';
import Component from './App';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const {
    catalog,
    cells,
    flipped,
    answered,
    score,
    page,
    actions,
  } = state;

  return {
    actions: actions.slice(1),
    catalog,
    cells,
    flipped,
    answered,
    score,
    hasUnopened: answered < page * catalog.pageSize,
    hasNextPage: catalog.hasNextPage(page)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInit() {
      dispatch(Actions.buildBoard());
      ga('send', 'event', 'build_board', 'init');
    },
    onCellClick(index, cell) {
      if (!cell.open) {
        dispatch(Actions.flip(index));
        ga('send', 'event', 'flip', 'box');
      }
    },
    onCellScore(index, score, cell) {
      dispatch(Actions.score({ index, score }));
      if(score > 0) {
        ga('send', 'event', 'score', 'correct');
      } else {
        ga('send', 'event', 'score', 'wrong');
      }
    },
    onNextPage() {
      dispatch(Actions.buildBoard());
      ga('send', 'event', 'build_board', 'next_page');
    },
    onGameEnd(stats) {
      ga('send', 'event', 'game_end', '', JSON.stringify(stats), stats.score);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
