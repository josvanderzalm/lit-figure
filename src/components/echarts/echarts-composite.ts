// src/components/echarts/echarts-composite.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../echarts/echarts-line.ts';

@customElement('echarts-composite')
export default class EchartsComposite extends LitElement {
  @property({ type: Object }) config: any;
  @property({ type: Object }) data: any;
  render() {
    const seriesList = this.data.series || [];
    return html`
      ${seriesList.map((series: any) => html`
        <chart-echarts-line .config=${this.config} .data=${{ series: [series] }}></chart-echarts-line>
      `)}
    `;
  }
}
