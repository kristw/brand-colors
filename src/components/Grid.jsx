import Cube from './Cube';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string,
  cells: PropTypes.array,
  onCellClick: PropTypes.func,
  onCellScore: PropTypes.func,
};
const defaultProps = {
  className: '',
  cells: [],
  onCellClick() {},
  onCellScore() {},
};

const Container = styled.div`
  padding: 0px;
`;

const Row = styled.div`
  vertical-align: top;
  height: 150px;
  margin: 25px 0;
`;

class Grid extends React.Component {
  render() {
    const { className, cells, onCellClick, onCellScore } = this.props;
    const dim = Math.ceil(Math.sqrt(cells.length));
    const rows = [];
    const len = cells.length;
    for (var i=0; i<len; i++) {
      if (i%dim === 0) rows.push([]);
      rows[rows.length - 1].push(cells[i]);
    }

    return (
      <Container className={className}>
        {rows.map((r, i) => (
          <Row key={i}>
            {r.map((cell, j) => (
              <Cube
                key={cell.brand.name}
                cell={cell}
                onClick={e => { onCellClick(i * dim + j, cell) }}
                onScore={score => { onCellScore(i * dim + j, score, cell); }}
              />
            ))}
          </Row>
        ))}
      </Container>
    );
  }
}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
