// src/components/highcharts/highcharts-composite.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('highcharts-composite')
export default class HighchartsComposite extends LitElement {
  @property({ type: Object }) config: any;
  @property({ type: Object }) data: any;

  render() {
    const seriesList = this.data.series || [];
    console.log(seriesList)
    return html`
      ${seriesList.map((series: any) => html`
        <chart-highcharts-line .config=${this.config} .data=${{ series: [series] }}></chart-highcharts-line>
      `)}
    `;
  }
}