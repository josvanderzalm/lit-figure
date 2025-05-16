import deepmerge from 'deepmerge';
import { css, html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import { colorOffset, importColorScheme } from '@/color/utils';
import { stripPathSegments } from '@/common/utils';

import '@/common/components/action-menu/menu';

import { loadROSansFonts } from '@/common/utils';
import type { ActionItem, ColorScheme, DataArray, GroupActionItem, Options } from '@/types';

export class BaseFigure extends LitElement {
    static styles = css`
        :host {
            font-family: 'RO Sans', Calibri, Verdana, sans-serif;
            display: block;
        }
        h1,
        h2 {
            color: rgb(21, 66, 115);
            line-height: 1em;
            margin: 0;
        }
        h1 {
            font-size: 1.06rem;
            font-weight: bold;
            margin-bottom: 0em;
        }
        h2 {
            font-size: 0.85rem;
            font-weight: normal;
            margin-top: 0;
        }
    `;

    @property({ type: Object }) options: Options = {};
    @property({ type: Array }) data: DataArray = [];
    @property({ type: String }) baseUrl: string = '';

    constructor() {
        super();

        // Get the current file's URL
        const url = new URL('.', import.meta.url).href;

        // @ts-expect-error: TypeScript might not recognize 'env'
        this.baseUrl = stripPathSegments(url, import.meta.env.DEV ? 3 : 2);
    }

    // Subclasses override this to render charts asynchronously
    protected async renderChart(container: HTMLElement): Promise<void> {
        void container;
        console.warn('renderChart() not implemented by subclass.');
    }

    // Only update when relevant properties change
    protected shouldUpdate(changedProps: Map<string | number | symbol, unknown>): boolean {
        return changedProps.has('options') || changedProps.has('data');
    }

    // Deep merge with overwrite for arrays
    protected mergeOptions(a: object, b: object): object {
        const overwriteMerge = (_destinationArray, sourceArray) => sourceArray;

        return deepmerge(a, b, { arrayMerge: overwriteMerge });
    }

    // Load fonts, then render chart on first update
    protected async firstUpdated(): Promise<void> {
        try {
            await loadROSansFonts();
        } catch (err) {
            console.error('Font loading failed:', err);
        }

        const container = this.shadowRoot?.getElementById('container');

        if (!container) {
            console.error('Container element not found in shadow root');

            return;
        }

        await this.renderChart(container);
    }

    // Re-render chart when data or options change
    protected async updated(changedProps: Map<string | number | symbol, unknown>): Promise<void> {
        if (changedProps.has('options') || changedProps.has('data')) {
            const container = this.shadowRoot?.getElementById('container');

            if (!container) {
                console.error('Container element missing on update');

                return;
            }
            await this.renderChart(container);
        }
    }

    // Dynamically import and offset color schemes
    protected async getColors(
        colorScheme: ColorScheme = 'Standard',
        offset?: number,
        reverse = false,
        steps?: number,
    ): Promise<string[]> {
        const scheme = await importColorScheme(colorScheme, steps);
        const colors = Array.isArray(scheme) ? scheme : scheme.colors;

        return colorOffset(colors, offset, reverse);
    }

    // Default action buttons (can be overridden)
    protected getButtons(): ActionItem[] {
        return [
            {
                id: 'show-table',
                type: 'button',
                label: 'Show table',
                action: () => console.log('Show table clicked, data:', this.getTableData()),
            },
            {
                id: 'export',
                type: 'group',
                label: 'Export',
                children: [
                    {
                        id: 'download-csv',
                        type: 'button',
                        label: 'Download CSV',
                        action: () => console.log('Download CSV clicked'),
                    },
                    {
                        id: 'download-xls',
                        type: 'button',
                        label: 'Download XLS',
                        action: () => console.log('Download XLS clicked'),
                    },
                ],
            },
        ];
    }

    // Add new buttons to a target group before/after existing ones
    protected addButtons(
        existingButtons: ActionItem[],
        newButtons: ActionItem[],
        targetGroupId: string,
        position: 'before' | 'after' = 'after',
    ): ActionItem[] {
        return existingButtons.map((item) => {
            if (item.type === 'group' && item.id === targetGroupId) {
                const children = item.children ?? [];

                return {
                    ...item,
                    children:
                        position === 'before'
                            ? [...newButtons, ...children]
                            : [...children, ...newButtons],
                };
            }

            return item;
        });
    }

    // Remove buttons matching given IDs; also remove empty groups
    protected unsetButtons(items: ActionItem[], filterIds: string[]): ActionItem[] {
        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];

            if (item.type === 'group') {
                const group = item as GroupActionItem;

                this.unsetButtons(group.children, filterIds);
                if (group.children.length === 0) {
                    items.splice(i, 1);
                }
            } else if (filterIds.includes(item.id)) {
                items.splice(i, 1);
            }
        }

        return items;
    }

    // Get data for chart rendering (default from options)
    protected getFigureData(): DataArray {
        return this.options.dataSet ?? [];
    }

    // Get data for table rendering (default from options)
    protected getTableData(): DataArray {
        return this.options.dataSet ?? [];
    }

    // Render chart title and subtitle as HTML
    protected getHtmlTitle() {
        return html`
            <h1>${this.options.title ?? nothing}</h1>
            <h2>${this.options.subtitle ?? nothing}</h2>
        `;
    }

    // Main render method
    render() {
        return html`
            ${this.getHtmlTitle()}
            <div id="container" style="width: 100%; height: 100%"></div>
            <action-menu .buttons=${this.getButtons()}></action-menu>
        `;
    }
}
