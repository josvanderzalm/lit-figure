// Highcharts composite
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { HighchartsBase } from '@/components/highcharts/highcharts-base';

@customElement('highcharts-composite')
export class HighchartsComposite extends HighchartsBase {
    async renderChart(container: HTMLElement) {
        console.log(container);
    }
    render() {
        return html`${this.options.title}${super.render()}`;
    }
}
