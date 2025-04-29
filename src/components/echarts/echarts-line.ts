// src/components/charts/echarts-line.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('echarts-line') // Ensure this is defined as 'echarts-line'
export class EchartsLine extends LitElement {
  @property({ type: Object }) config: any = {};
  @property({ type: Object }) data: any = {};

  static styles = css`
    :host {
      display: block;
      border: 1px solid #ddd;
      padding: 1rem;
    }
  `;

  render() {
    return html`<p>ECharts Line Chart Placeholder</p>`;
  }
}