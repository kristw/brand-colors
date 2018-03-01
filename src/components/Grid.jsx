import Cube from './Cube';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  className: PropTypes.string,
  cells: PropTypes.array,
};
const defaultProps = {
  className: '',
  cells: [],
};

class Grid extends React.Component {
  render() {
    const { className, cells } = this.props;
    const dim = Math.ceil(Math.sqrt(cells.length));
    const rows = [];
    const len = cells.length;
    for (var i=0; i<len; i++) {
      if (i%dim === 0) rows.push([]);
      rows[rows.length - 1].push(cells[i]);
    }

    return (
      <div className={className}>
        {rows.map(r => (
          <div className="row">
            {r.map(cell => (
              <Cube cell={cell} />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
