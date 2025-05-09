import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import '../action-menu/action-menu';

import type { ActionItem, DataArray, Options } from '@/types';
import { loadROSansFonts } from '@/utils//index';

export class BaseChart extends LitElement {
    static styles = css`
        :host {
            font-family: 'RO Sans', Calibri, Verdana, sans-serif;
        }
    `;

    @property({ type: Object }) options: Options = {}; // Chart options (for customization)
    @property({ type: Array }) data: DataArray = []; // Data for the chart

    // Allow subclasses to override with async support
    protected async renderChart(container: HTMLElement): Promise<void> {
        console.log('BaseChart.renderChart called', container);
        // This method should be implemented in subclasses (to render the chart)
    }

    // Prevent unnecessary updates by overriding shouldUpdate
    shouldUpdate(changedProperties: Map<string | number | symbol, unknown>): boolean {
        // Only update if options or data have changed
        return changedProperties.has('options') || changedProperties.has('data');
    }

    // Called after the first render
    async firstUpdated() {
        // Call the external function to load the fonts
        try {
            await loadROSansFonts();
            // Optional: Add a class or property to indicate fonts are ready if needed for styling
            // this.classList.add('fonts-ready');
        } catch (error) {
            // Handle potential errors from font loading
            console.error('Component detected font loading error:', error);
        }

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

    // Add generic action buttons
    getButtons(): ActionItem[] {
        return [
            {
                type: 'button',
                label: 'Base Action',
                action: () => console.log('Base Action clicked'),
            },
            {
                type: 'group',
                label: 'More Actions',
                children: [
                    {
                        type: 'button',
                        label: 'Base Group Action 1',
                        action: () => console.log('Base Group Action 1 clicked'),
                    },
                    {
                        type: 'button',
                        label: 'Base Group Action 2',
                        action: () => console.log('Base Group Action 2 clicked'),
                    },
                ],
            },
        ];
    }

    render() {
        return html` <div id="container" style="width:100%; height:100%"></div>
            <action-menu .buttons=${this.getButtons()}></action-menu>`;
    }
}
