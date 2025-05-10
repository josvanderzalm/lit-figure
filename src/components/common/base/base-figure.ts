import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import '../action-menu/action-menu';

import type { ActionItem, DataArray, GroupActionItem, Options } from '@/types';
import { loadROSansFonts } from '@/utils//index';

export class BaseChart extends LitElement {
    static styles = css`
        :host {
            font-family: 'RO Sans', Calibri, Verdana, sans-serif;
        }
    `;

    @property({ type: Object }) options: Options = {}; // Chart options (for customization)
    @property({ type: Array }) data: DataArray = []; // Data for the chart
    @property({ type: String }) base_url: string;

    constructor() {
        super();
        // Derive base_url from the component's own file location
        this.base_url = new URL('./assets', import.meta.url).href; // Relative to the module location
    }

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
                id: 'show-table',
                type: 'button',
                label: 'Show table',
                action: () => console.log('Show table action clicked'),
            },
        ];
    }

    // Delete betton fram the ActionItem array
    deleteButtons(items: ActionItem[], filterIds: string[]): ActionItem[] {
        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];

            if (item.type === 'group') {
                const group = item as GroupActionItem;

                this.deleteButtons(group.children, filterIds);

                if (group.children.length === 0) {
                    delete items[i];
                    items.splice(i, 1); // remove empty group entirely
                }
            } else if (filterIds.includes(item.id)) {
                delete items[i]; // make value undefined
                items.splice(i, 1); // remove it from the array
            }
        }

        return items;
    }

    // render the chart container and action menu
    render() {
        console.log('base_url', this.base_url);

        return html`<div id="container" style="width:100%; height:100%"></div>
            <action-menu .buttons=${this.getButtons()}></action-menu>`;
    }
}
