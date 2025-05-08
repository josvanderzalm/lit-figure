import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import type { DataArray, Options } from '@/types';

export class BaseChart extends LitElement {
    @property({ type: Object }) options: Options = {}; // Chart options (for customization)
    @property({ type: Array }) data: DataArray = []; // Data for the chart

    // Allow subclasses to override with async support
    protected async renderChart(container: HTMLElement): Promise<void> {
        console.log('BaseChart.renderChart called', container);
        // This method should be implemented in subclasses (to render the chart)
    }

    // Prevent unnecessary updates by overriding shouldUpdate
    shouldUpdate(
        changedProperties: Map<string | number | symbol, unknown>,
    ): boolean {
        // Only update if options or data have changed
        return (
            changedProperties.has('options') || changedProperties.has('data')
        );
    }

    // Called after the first render
    async firstUpdated() {
        const container = this.shadowRoot!.getElementById('container')!;
        if (!container) {
            console.error('Container not found in shadow root');
            return;
        }
        await this.renderChart(container); // Call the subclass method to render the chart
    }

    // Only trigger render if options or data have changed
    async updated(changed: Map<string, unknown>) {
        if (changed.has('options') || changed.has('data')) {
            const container = this.shadowRoot!.getElementById('container')!;
            await this.renderChart(container);
        }
    }

    render() {
        return html`<div id="container" style="width:100%; height:100%"></div>`; // Rendering a container div
    }
}
