import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@/common/components/figure/figure-loader';

@customElement('rivm-smdv-figure')
export class FigurerWrapper extends LitElement {
    @property({ type: String, attribute: 'config-src' })
    configSrc?: string;

    @property({ type: Boolean, reflect: true })
    sandbox = false;

    createRenderRoot() {
        return this.attachShadow({ mode: 'closed' });
    }

    render() {
        return html`
            <rivm-smdv-figure-loader
                .configSrc=${this.configSrc}
                .sandbox=${this.sandbox}
            ></rivm-smdv-figure-loader>
        `;
    }
}
