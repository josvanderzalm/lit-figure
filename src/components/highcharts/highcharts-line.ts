// Highcharts Line
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { BaseChart } from '../common/base/base-chart';

@customElement('highcharts-line')
export class EchartsLine extends BaseChart {
    async renderChart(container: HTMLElement) {
        console.log(container);
        // const { default: ECharts } = await import('echarts');
        // const instance = ECharts.init(container);
        // instance.setOption({
        //   ...this.config,
        //   series: this.data.series || []
        // });
    }
    render() {
        return html`yyyyy`;
    }
}
