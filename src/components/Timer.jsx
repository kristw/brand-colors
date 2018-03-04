import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: '',
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      now: 0,
    };
    this.update = null;
  }

  start() {
    this.setState({ start: (new Date()).getTime() });
    this.update = setInterval(() => {
      this.setState({
        now: (new Date()).getTime() - this.state.start
      });
    }, 100);
  }

  stop() {
    if(this.update) {
      clearInterval(this.update);
      this.update = null;
    }
  }

  getTime() {
    return this.state.now;
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        Time: {(this.state.now / 1000).toFixed(1)}s
      </div>
    );
  }
}

Timer.propTypes = propTypes;
Timer.defaultProps = defaultProps;

export default Timer;
