// src/components/rivm-smvd-figure.ts
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { registry } from './registry';

import '@/components/sandbox/sandbox-iframe';

import type { DataArray, Options, Registry, RendererProps } from '@/types';

@customElement('rivm-smdv-figure')
export class RivmSmvdFigure extends LitElement {
    @property({ type: Object }) options: Options = {};

    @property({ type: String }) library = '';
    @property({ type: String }) type = '';
    @property({ type: Object }) config: Options = {};
    @property({ type: Array }) data: DataArray = [];

    @state() private _renderer: ((props: RendererProps) => unknown) | null =
        null;
    @state() private _isPreprocessingReady = false;

    static styles = css`
        :host {
            display: block;
        }
    `;

    async updated(changed: Map<string, unknown>) {
        if (
            changed.has('options') &&
            this.options &&
            !this._isPreprocessingReady
        ) {
            this.options = await this.preprocessOptions(this.options);
            this._isPreprocessingReady = true;
        }
        if (changed.has('library') || changed.has('type')) {
            this.loadRenderer();
        } else if (changed.has('config') || changed.has('data')) {
            this.requestUpdate();
        }
    }

    private async fetchJSON<T = unknown>(src: string): Promise<T> {
        const response = await fetch(src);
        if (!response.ok)
            throw new Error(`Failed to fetch ${src}: ${response.statusText}`);
        return await response.json();
    }

    private async preprocessOptions(options: Options): Promise<Options> {
        let result: Options = { ...options };

        if (result.configSrc) {
            const config = await this.fetchJSON<Partial<Options>>(
                result.configSrc,
            );
            result = { ...result, ...config };
        }

        if (result.dataSrc) {
            const data = await this.fetchJSON<DataArray>(result.dataSrc);
            result.dataSet = data;
        }

        return result;
    }

    async loadRenderer() {
        const typedRegistry = registry as unknown as Registry;
        const loader = typedRegistry[this.library]?.[this.type];

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
