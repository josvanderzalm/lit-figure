// ECharts Line
import { customElement } from 'lit/decorators.js';

import { BaseChart } from '../common/base/base-chart';

@customElement('echarts-line')
export class EchartsLine extends BaseChart {
    // async renderChart(container: HTMLElement) {
    //   // const { default: ECharts } = await import('echarts');
    //   // const instance = ECharts.init(container);
    //   // instance.setOption({
    //   //   ...this.config,
    //   //   series: this.data.series || []
    //   // });
    // }
}
