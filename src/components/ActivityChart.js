import 'd3-transition';

import { SvgChart, helper } from 'd3kit';
import { axisLeft, axisTop } from 'd3-axis';

import actionTypes from '../actionTypes';
import { scaleLinear } from 'd3-scale';

class AcivityChart extends SvgChart {
  static getDefaultOptions() {
    return helper.deepExtend(super.getDefaultOptions(), {
      margin: { top: 40, left: 40, right: 40, bottom: 10 },
      initialWidth: 400,
      initialHeight: 150
    });
  }

  static getCustomEventNames() {
    return [];
  }

  constructor(element, options) {
    super(element, options);

    this.layers.create(['x-axis', 'y-axis', 'points', 'line']);
    this.xScale = scaleLinear();
    this.yScale = scaleLinear()
      .domain([0, 36])
    this.xAxis = axisTop()
      .scale(this.xScale)
      .tickSizeOuter(0)
      .ticks(5);
    this.yAxis = axisLeft()
      .tickSizeOuter(0)
      .scale(this.yScale)
      .ticks(4);

    this.visualize = this.visualize.bind(this);
    this.on('data', this.visualize);
    this.on('options', this.visualize);
    this.on('resize', this.visualize);
  }

  visualize() {
    if (!this.hasData() || !this.hasNonZeroArea()) return;

    const data = this.data();
    if (data.length === 0) return;

    const start = data[0].time.getTime();

    this.xScale
      .domain([0, data[data.length - 1].time.getTime() - start])
      .nice()
      .range([0, this.getInnerWidth()]);

    this.yScale
      .range([this.getInnerHeight(), 0]);

    this.xAxis
      .tickFormat(d => (d / 1000).toFixed(1) + 's');

    this.layers.get('x-axis').transition()
      // .attr('transform', `translate(0,${this.getInnerHeight()})`)
      .call(this.xAxis);

    this.layers.get('y-axis').transition()
      .call(this.yAxis);

    const s = this.layers.get('points').selectAll('circle')
      .data(data);

    s.enter().append('circle')
      .attr('cx', d => this.xScale(d.time - start))
      .attr('cy', d => this.yScale(d.score))
      .style('stroke', d => {
        if(d.action.type === actionTypes.SCORE) {
          if(d.action.payload.score > 0) {
            return '#2E9E49';
          } else {
            return '#E73A2F';
          }
        }
        return '#222';
      })
      .attr('r', d => d.action.type === actionTypes.SCORE ? 3 : 1)

    s.transition()
      .attr('cx', d => this.xScale(d.time - start))
      .attr('cy', d => this.yScale(d.score))
  }
}

export default AcivityChart;
9