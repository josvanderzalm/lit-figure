import { html, LitElement } from 'lit';
import { property, query, state } from 'lit/decorators.js';

import { Options } from '@/types';

// SCOPED ELEMENT, DO NOT ADD: @customElement('sandbox-iframe')
export class SandboxWrapper extends LitElement {
    @property({ type: Object }) options: Options = {};

    @query('iframe')
    private _iframe!: HTMLIFrameElement;

    @state()
    private _iframeHeight = '10px'; // Initial height

    firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
        super.firstUpdated(_changedProperties);
        this._iframe.addEventListener('load', () => {
            this._sendOptionsToIframe();
        });
        window.addEventListener('message', this._handleIframeMessage);
    }

    updated(_changedProperties: Map<string | number | symbol, unknown>): void {
        super.updated(_changedProperties);
        if (_changedProperties.has('options') && this._iframe?.contentWindow) {
            this._sendOptionsToIframe();
        }
    }

    private _sendOptionsToIframe() {
        if (this._iframe && this._iframe.contentWindow) {
            this._iframe.contentWindow.postMessage({ type: 'options', data: this.options }, '*');
        }
    }

    private _handleIframeMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === 'iframe-height') {
            const height = event.data.value;

            if (typeof height === 'number' && height > 0) {
                this._iframeHeight = `${height}px`;
            }
        }
    };

    render() {
        return html`
            <iframe
                src="./sandbox-iframe.html"
                scrolling="no"
                style="width: 100%; overflow: hidden; outline: 6px dashed rgba(0,0,0,0.2); border: none; height: ${this
                    ._iframeHeight};"
            ></iframe>
        `;
    }
}
