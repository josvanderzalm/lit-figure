// ECharts Line
import { html } from 'lit';

import { EchartsBase } from '@/echarts/base/base';

// SCOPED ELEMENT, DO NOT ADD: @customElement('echarts-line')
export class EchartsLine extends EchartsBase {
    async renderChart(container: HTMLElement) {
        console.log(container);
    }
    render() {
        return html`Echarts-line`;
    }
}
