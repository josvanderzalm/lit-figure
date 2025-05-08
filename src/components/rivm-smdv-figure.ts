import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { DataArray, Options, Registry, RendererProps } from '@/types';

import { registry } from './registry';

@customElement('rivm-smdv-figure')
export class RivmSmvdFigure extends LitElement {
    @property({ type: Object }) options: Options = {};

    // eslint-disable-next-line no-unused-vars
    @state() private _renderer?: (options: RendererProps) => unknown;
    @state() private _isPreprocessingReady = false;

    error_message: string | null = null;

    async updated(changed: Map<string, unknown>) {
        if (changed.has('options') && !this._isPreprocessingReady) {
            this.options = await this.preprocessOptions(this.options);
            this._isPreprocessingReady = true;
            this.loadRenderer();
        }
    }

    async loadRenderer() {
        const typedRegistry = registry as unknown as Registry;

        let group: string | undefined;
        let componentType: string | undefined;

        if (this.options?.sandbox) {
            group = 'common';
            componentType = 'sandbox';
        } else {
            group = this.options?.library ?? 'highcharts';
            componentType = this.options?.type ?? 'linex';
        }

        const loader = typedRegistry[group]?.[componentType];

        if (loader) {
            this._renderer = await loader();
            this.requestUpdate();
        } else {
            this._renderer = null;
            this.error_message = `Error: Figure of the type ${group}-${componentType} is not found`;
        }
    }

    private async preprocessOptions(options: Options): Promise<Options> {
        let result: Options = { ...options };

        if (result.configSrc && !result.configFetched) {
            const config = await this.fetchJSON<Partial<Options>>(
                result.configSrc,
            );
            result.configFetched = true;
            result = { ...result, ...config };
        }

        if (result.dataSrc && !result.dataFetched) {
            const data = await this.fetchJSON<DataArray>(result.dataSrc);
            result.dataSet = data;
            result.dataFetched = true;
        }

        return result;
    }

    private async fetchJSON<T = unknown>(src: string): Promise<T> {
        const response = await fetch(src);
        if (!response.ok)
            throw new Error(`Failed to fetch ${src}: ${response.statusText}`);
        return await response.json();
    }

    render() {
        if (this.error_message) {
            return html` <p>${this.error_message}</p>`;
        }
        if (!this._renderer) return html`<p>Loading chart...</p>`;
        return this._renderer({ options: this.options });
    }
}
