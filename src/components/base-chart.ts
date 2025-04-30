// BaseChart.ts (shared base for both Highcharts and ECharts)
import { LitElement, html } from 'lit';
import { property } from "lit/decorators.js";

export class BaseChart extends LitElement {
  @property({ type: Object }) config: any = {};
  @property({ type: Object }) data: any = {};

  protected renderChart(_container: HTMLElement): void {
    // Implement in subclass
  }

  firstUpdated() {
    this.renderChart(this.shadowRoot!.getElementById('container')!);
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('config') || changed.has('data')) {
      this.renderChart(this.shadowRoot!.getElementById('container')!);
    }
  }

  render() {
    return html`<div id="container" style="width:100%; height:100%"></div>`;
  }
}
