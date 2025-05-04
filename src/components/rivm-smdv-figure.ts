// src/components/rivm-smvd-figure.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { registry } from './registry';

import '@/components/sandbox/sandbox-iframe';

import type { Options } from '@/types';

@customElement('rivm-smdv-figure')
export class RivmSmvdFigure extends LitElement {
  @property({ type: Object }) options: Options = {};

  @property({ type: String }) library = '';
  @property({ type: String }) type = '';
  @property({ type: Object }) config: any = {};
  @property({ type: Object }) data: any = {};

  @state() private _renderer: ((props: any) => unknown) | null = null;
  @state() private _isPreprocessingReady = false;


  static styles = css`
    :host {
      display: block;
    }
  `;

  async updated(changed: Map<string, unknown>) {
    if (changed.has('options') && this.options && !this._isPreprocessingReady) {
      this.options = await this.preprocessOptions(this.options);
      this._isPreprocessingReady = true;
    }
    if (changed.has('library') || changed.has('type')) {
      this.loadRenderer();
    } else if (changed.has('config') || changed.has('data')) {
      this.requestUpdate();
    }
  }

  private async fetchJSON(src: string): Promise<any> {
    const response = await fetch(src);
    if (!response.ok) throw new Error(`Failed to fetch ${src}: ${response.statusText}`);
    return await response.json();
  }

  private async preprocessOptions(options: Options): Promise<Options> {
    let result = { ...options };

    if (result['config-src']) {
      const config = await this.fetchJSON(result['config-src']);
      result = { ...result, ...config };
    }

    if (result['data-src']) {
      const data = await this.fetchJSON(result['data-src']);
      result['data-set'] = data;
    }

    return result;
  }

  async loadRenderer() {
    const loader = ((registry as unknown) as Record<string, Record<string, () => Promise<(props: any) => unknown>>>)[this.library]?.[this.type];
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
