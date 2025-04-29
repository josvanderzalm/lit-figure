// src/components/highcharts/highcharts-line.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('highcharts-line')
export default class HighchartsLine extends LitElement {
  @property({ type: Object }) config: any;
  @property({ type: Object }) data: any;

  render() {
    console.log('highcharts-line')
    return html`<div>Highcharts Line: ${JSON.stringify(this.data)}</div>`;
  }
}