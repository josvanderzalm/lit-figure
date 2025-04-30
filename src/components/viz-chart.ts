// src/components/viz-chart.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { registry } from './registry';

@customElement('viz-chart')
export class VizChart extends LitElement {
  @property({ type: String }) library = '';
  @property({ type: String }) type = '';
  @property({ type: Object }) config: any = {};
  @property({ type: Object }) data: any = {};

  @state() private _renderer: ((props: any) => unknown) | null = null;

  static styles = css`
    :host {
      display: block;
    }
  `;

  updated(changed: Map<string, unknown>) {
    if (changed.has('library') || changed.has('type')) {
      this.loadRenderer();
    } else if (changed.has('config') || changed.has('data')) {
      this.requestUpdate();
    }
  }

  async loadRenderer() {
    const loader = registry[this.library]?.[this.type];
    if (loader) {
      this._renderer = await loader();
      this.requestUpdate();
    } else {
      this._renderer = null;
    }
  }

  render() {
    if (!this._renderer) return html`<p>Loading chart...</p>`;
    return this._renderer({ config: this.config, data: this.data });
  }
}
