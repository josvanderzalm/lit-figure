// Highcharts Line
import { customElement } from 'lit/decorators.js';
import { BaseChart } from '../base/base-chart';

@customElement('highcharts-line')
export class HighchartsLine extends BaseChart {
  async renderChart(container: HTMLElement) {
    const Highcharts = (await import('highcharts')).default;
     await import('highcharts/modules/exporting');
    //lineModule.default(Highcharts);

    Highcharts.chart(container, {
      ...this.config,
      series: this.data.series || []
    });
  }
}