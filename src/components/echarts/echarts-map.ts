// ECharts Map
import { customElement } from 'lit/decorators.js';

import { BaseChart } from '../common/base/base-chart';

@customElement('echarts-map')
export class EchartsMap extends BaseChart {
    // async renderChart(container: HTMLElement) {
    //   // const echartsModule = await import('echarts');
    //   // const instance = echartsModule.default.init(container);
    //   // instance.setOption({
    //   //   ...this.config,
    //   //   series: this.data.series || []
    //   // });
    // }
}
