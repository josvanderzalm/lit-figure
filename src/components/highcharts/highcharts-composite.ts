import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { DataArray, Options } from '@/types';

@customElement('highcharts-composite')
export default class HighchartsComposite extends LitElement {
    @property({ type: Object }) config!: Options; // Use definite assignment assertion
    @property({ type: Array }) data!: DataArray; // Use definite assignment assertion

    render() {
        // Ensure that 'data' is an array and has a 'series' property
        const seriesList = Array.isArray(this.data[0]?.series)
            ? this.data[0]?.series
            : [];
        console.log(seriesList);
        return html`
            ${seriesList.map(
                (series: { [key: string]: string | number }) => html`
                    <chart-highcharts-line
                        .config=${this.config}
                        .data=${{ series: [series] }}
                    ></chart-highcharts-line>
                `,
            )}
        `;
    }
}
