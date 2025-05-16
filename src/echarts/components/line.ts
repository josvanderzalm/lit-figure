// ECharts Line
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { EchartsBase } from '@/echarts/base/base';

@customElement('echarts-line')
export class EchartsLine extends EchartsBase {
    async renderChart(container: HTMLElement) {
        console.log(container);
    }
    render() {
        return html`Echarts-line`;
    }
}
