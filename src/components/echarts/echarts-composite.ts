// src/components/echarts/echarts-composite.ts
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../echarts/echarts-line.ts';

import type { DataArray, Options } from '@/types';

@customElement('echarts-composite')
export default class EchartsComposite extends LitElement {
    @property({ type: Object }) config: Options = {};
    @property({ type: Array }) data: DataArray = [];
    render() {
        return html`todo`;
        //const seriesList = this.data.series || [];
        // return html`
        //   ${seriesList.map(
        //     (series: { [key: string]: string | number }) => html`
        //       <chart-echarts-line
        //         .config=${this.config}
        //         .data=${{ series: [series] }}
        //       ></chart-echarts-line>
        //     `,
        //   )}
        // `;
    }
}
