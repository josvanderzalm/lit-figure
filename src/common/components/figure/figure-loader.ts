import { css, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { rivmSmvdRegistry } from '@/common/registry';
import type { DataArray, Options } from '@/types';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';

type RegistryResult = {
    template: (props: { options: Options }) => TemplateResult;
    module: typeof HTMLElement;
};

@customElement('rivm-smdv-figure-loader')
export class FigureLoader extends ScopedElementsMixin(LitElement) {
    @state() private isLoading = false;
    @state() private _renderer?: RegistryResult;

    @property({ type: Object }) options: Options = {};
    @property({ type: Boolean }) sandbox = false;
    @property({ type: String, attribute: 'config-src' }) configSrc?: string;

    static styles = css`
        :host {
            all: unset;
            display: block;
            border: 0.5px solid rgba(0, 0, 0, 0.2);
        }
    `;

    async connectedCallback(): Promise<void> {
        super.connectedCallback();
        this.options = await this.preprocessOptions(this.options);
        await this.loadComponent();
    }

    private async preprocessOptions(input: Options): Promise<Options> {
        let result: Options = { ...input };

        result.configSrc ??= this.configSrc ?? this.options.configSrc;
        result.sandbox ??= this.sandbox || this.options.sandbox;

        if (result.configSrc && !result.configFetched) {
            try {
                const config = await this.fetchJSON<Partial<Options>>(result.configSrc);

                result = { ...result, ...config, configFetched: true };
            } catch (err) {
                console.error(`Error fetching config from ${result.configSrc}`, err);
            }
        }

        if (result.dataSrc && !result.dataFetched) {
            try {
                const data = await this.fetchJSON<DataArray>(result.dataSrc);

                result = { ...result, dataSet: data, dataFetched: true };
            } catch (err) {
                console.error(`Error fetching data from ${result.dataSrc}`, err);
            }
        }

        return result;
    }

    private async fetchJSON<T>(src: string): Promise<T> {
        const response = await fetch(src);

        if (!response.ok) {
            throw new Error(`Failed to fetch ${src}: ${response.statusText}`);
        }

        return await response.json();
    }

    private async loadComponent(): Promise<void> {
        if (this.isLoading || this._renderer) return;

        this.isLoading = true;

        const { sandbox, library = 'highcharts', type = 'line' } = this.options;
        const group = sandbox ? 'common' : library;
        const chartType = sandbox ? 'sandbox' : type;
        const tagName = `${group}-${chartType}`;

        if (sandbox) {
            this.options.sandbox = false;
        }

        try {
            const result = await rivmSmvdRegistry?.[group]?.[chartType]?.();

            if (!result) {
                throw new Error(`No registry entry for ${tagName}`);
            }

            this._renderer = result;

            if (!this.registry.get(tagName)) {
                this.registry.define(tagName, result.module);
            }

            this.dispatchEvent(
                new CustomEvent('rivm-smdv-figure-lazy-loaded', {
                    detail: { tagName },
                    bubbles: true,
                    composed: true,
                }),
            );
        } catch (err) {
            console.error(`Lazy load failed for "${tagName}":`, err);
        } finally {
            this.isLoading = false;
        }
    }

    render(): TemplateResult {
        return html`
            ${!this._renderer
                ? html`<span>Loading figure...</span>`
                : this._renderer.template({ options: this.options })}
        `;
    }
}
