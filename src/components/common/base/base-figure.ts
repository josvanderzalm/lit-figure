import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import '../action-menu/action-menu';
import '@/components/common/table';

import type { ActionItem, DataArray, GroupActionItem, Options } from '@/types';
import { loadROSansFonts } from '@/utils/index';

export class BaseChart extends LitElement {
    static styles = css`
        :host {
            font-family: 'RO Sans', Calibri, Verdana, sans-serif;
        }
        h1,
        h2 {
            font-size: 17px;
            font-weight: bold;
            color: rgb(21, 66, 115);
            line-height: 0.9em;
        }
        h1 {
            margin-bottom: 0;
        }
        h2 {
            margin-top: 0;
            font-size: 14px;
            font-weight: normal;
        }
    `;

    @property({ type: Object }) options: Options = {}; // Chart options (for customization)
    @property({ type: Array }) data: DataArray = []; // Data for the chart
    @property({ type: String }) base_url: string;

    constructor() {
        super();
        // TODO: Derive base_url from the component's own file location
        // Build: http://localhost:4173/assets/assets
        // Dev: http://localhost:5173/src/components/common/base/assets
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

    // Offset the color array to create a unique color palette
    protected colorOffset(offset: number = 0): string[] {
        const colors = [
            '#007bc7',
            '#ffb612',
            '#ca005d',
            '#552c6f',
            '#5EA892',
            '#e17000',
            '#39870c',
            '#673327',
        ];
        const len = colors.length;
        const normalizedOffset = ((offset % len) + len) % len; // handles negative offsets

        return [...colors.slice(normalizedOffset), ...colors.slice(0, normalizedOffset)];
    }

    // Add generic action buttons
    getButtons(): ActionItem[] {
        return [
            {
                id: 'show-table',
                type: 'button',
                label: 'Show table',
                action: () => console.log('Show table action clicked, data:', this.getTableData()),
            },
            {
                id: 'export',
                type: 'group',
                label: 'Export',
                children: [
                    {
                        id: 'download-csv',
                        type: 'button',
                        label: 'Download the data as CSV',
                        action: () => console.log('Export to CSV clicked'),
                    },
                    {
                        id: 'download-xls',
                        type: 'button',
                        label: 'Download the data as XLS',
                        action: () => console.log('Export to XLS clicked'),
                    },
                ],
            },
        ];
    }

    // add buttons to the button Array
    addButtons(
        existingButtons: ActionItem[],
        newButtons: ActionItem[],
        targetGroupId: string,
        position: 'before' | 'after' = 'after',
    ): ActionItem[] {
        return existingButtons.map((item) => {
            if (item.type === 'group' && item.id === targetGroupId) {
                const existingChildren = item.children || [];
                const updatedChildren =
                    position === 'before'
                        ? [...newButtons, ...existingChildren]
                        : [...existingChildren, ...newButtons];

                return {
                    ...item,
                    children: updatedChildren,
                };
            }

            return item;
        });
    }

    // Get the data needed for rendering the data table
    getTableData(): DataArray {
        console.log(this.options.dataSet);

        return this.options.dataSet;
    }

    getHtmlTitle() {
        const htmlTitle = html`<h1>${this.options.title ?? nothing}</h1>`;
        const htmlSubtitle = html`<h2>${this.options.subtitle ?? nothing}</h2>`;

        return html`${htmlTitle}${htmlSubtitle}`;
    }

    // Remove buttons from the ActionItem array
    unsetButtons(items: ActionItem[], filterIds: string[]): ActionItem[] {
        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];

            if (item.type === 'group') {
                const group = item as GroupActionItem;

                this.unsetButtons(group.children, filterIds);

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

        return html` <div id="container" style="width:100%; height:100%"></div>
            <table-wrapper .data=${this.getTableData()}></table-wrapper>
            <action-menu .buttons=${this.getButtons()}></action-menu>`;
    }
}
