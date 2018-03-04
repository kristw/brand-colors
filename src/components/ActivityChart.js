import 'd3-transition';
import './ActivityChart.css';

import { SvgChart, helper } from 'd3kit';
import { axisLeft, axisTop } from 'd3-axis';

import actionTypes from '../actionTypes';
import { scaleLinear } from 'd3-scale';

class AcivityChart extends SvgChart {
  static getDefaultOptions() {
    return helper.deepExtend(super.getDefaultOptions(), {
      margin: { top: 40, left: 40, right: 40, bottom: 10 },
      initialWidth: 400,
      initialHeight: 130
    });
  }

  static getCustomEventNames() {
    return [];
  }

  constructor(element, options) {
    super(element, options);

    this.container.classed('activity-chart', true);

    this.layers.create(['x-axis', 'y-axis', 'points', 'next', 'title']);
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

    this.layers.get('title').append('text')
      .text('Time')
      .attr('x', this.getInnerWidth() / 2)
      .attr('y', -25);

    this.layers.get('title').append('text')
      .text('Score')
      .attr('transform', `translate(-30, ${this.getInnerHeight() / 2})rotate(-90)`)

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
      .call(this.xAxis);

    this.layers.get('y-axis').transition()
      .call(this.yAxis);

    this.renderPoints(data.filter(d =>
      d.action.type !== actionTypes.BUILD_BOARD
    ), start);
    this.renderNext(data.filter(d =>
      d.action.type === actionTypes.BUILD_BOARD
    ), start);
  }

  renderNext(data, start){
    const s = this.layers.get('points').selectAll('rect')
      .data(data);

    const BAR_HEIGHT = 12;
    const HALF_BAR_HEIGHT = BAR_HEIGHT / 2;

    s.enter().append('rect')
      .attr('x', d => this.xScale(d.time - start))
      .attr('y', d => this.yScale(d.score) - HALF_BAR_HEIGHT)
      .attr('width', 1)
      .attr('height', BAR_HEIGHT)
      .attr('fill', '#222')
      .style('opacity', 0)
      .transition()
      .style('opacity', 1)

    s.transition()
      .attr('x', d => this.xScale(d.time - start))
      .attr('y', d => this.yScale(d.score) - HALF_BAR_HEIGHT);
  }

  renderPoints(data, start) {
    const s = this.layers.get('points').selectAll('circle')
      .data(data);

    s.enter().append('circle')
      .attr('cx', d => this.xScale(d.time - start))
      .attr('cy', d => this.yScale(d.score))
      .style('stroke', d => {
        if (d.action.type === actionTypes.SCORE) {
          if (d.action.payload.score > 0) {
            return '#2E9E49';
          } else {
            return '#E73A2F';
          }
        }
        return '#222';
      })
      .attr('r', d => d.action.type === actionTypes.SCORE ? 3 : 1)
      .style('opacity', 0)
      .transition()
      .style('opacity', 1)

    s.transition()
      .attr('cx', d => this.xScale(d.time - start))
      .attr('cy', d => this.yScale(d.score))
  }
}

export default AcivityChart;
