import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";

import type { DataArray, Options } from "@/types";

export class BaseChart extends LitElement {
  @property({ type: Object }) config: Options = {}; // Specify correct type
  @property({ type: Array }) data: DataArray = []; // Specify correct type

  // Protected method for rendering the chart, to be implemented by subclasses
  protected renderChart(container: HTMLElement): void {
    console.log(container);
    // Implement in subclass
  }

  // Called after the first render
  firstUpdated() {
    const container = this.shadowRoot!.getElementById("container")!;
    this.renderChart(container);
  }

  // Called when the component is updated
  updated(changed: Map<string, unknown>) {
    if (changed.has("config") || changed.has("data")) {
      const container = this.shadowRoot!.getElementById("container")!;
      this.renderChart(container);
    }
  }

  render() {
    return html`<div id="container" style="width:100%; height:100%"></div>`;
  }
}
