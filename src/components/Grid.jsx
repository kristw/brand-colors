import Cube from './Cube';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string,
  cells: PropTypes.array,
  onCellClick: PropTypes.func,
};
const defaultProps = {
  className: '',
  cells: [],
  onCellClick() {},
};

const Container = styled.div`
  padding: 0px;
`;

const Row = styled.div`
  height: 150px;
  margin: 20px 0;
`;

class Grid extends React.Component {
  render() {
    const { className, cells, onCellClick } = this.props;
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
          <Row>
            {r.map((cell, j) => (
              <Cube
                cell={cell}
                onClick={e => onCellClick(i * dim + j)}
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
