// Highcharts Map
import { customElement } from 'lit/decorators.js';

import { BaseChart } from '../base/base-chart';

@customElement('highcharts-map')
export class HighchartsMap extends BaseChart {
    async renderChart(container: HTMLElement) {
        const Highcharts = (await import('highcharts/highmaps')).default;
        const mapModule = await import('highcharts/modules/map');
        mapModule.default(Highcharts);
        console.log(container, Highcharts);
        // Highcharts.mapChart(container, {
        //   ...this.config,
        //   series: this.data.series || [],
        // });
    }
}
