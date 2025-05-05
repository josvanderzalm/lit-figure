// Highcharts Line
import { customElement } from 'lit/decorators.js';

import { BaseChart } from '../common/base/base-chart';

@customElement('highcharts-line')
export class HighchartsLine extends BaseChart {
    async renderChart(container: HTMLElement) {
        const Highcharts = (await import('highcharts')).default;
        await import('highcharts/modules/exporting');

        console.log(container, Highcharts);

        // Highcharts.chart(container, {
        //   ...this.config,
        //   series: this.data.series || [],
        // });
    }
}
