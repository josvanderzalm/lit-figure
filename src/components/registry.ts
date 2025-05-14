import { html } from 'lit';

import type { RendererProps } from '@/types';

export const registry = {
    common: {
        sandbox: async () => {
            await import('./common/sandbox/sandbox-wrapper.js');

            return (props: RendererProps) =>
                html`<sandbox-iframe .options=${props.options ?? {}}></sandbox-iframe>`;
        },
    },
    highcharts: {
        column: async () => {
            await import('./highcharts/highcharts-column.js');

            return (props: RendererProps) =>
                html`<highcharts-column .options=${props.options ?? {}}></highcharts-column>`;
        },
        composite: async () => {
            await import('./highcharts/highcharts-composite.js');

            return (props: RendererProps) =>
                html`<highcharts-composite .options=${props.options ?? {}}></highcharts-composite>`;
        },
        line: async () => {
            await import('./highcharts/highcharts-line.js');

            return (props: RendererProps) =>
                html`<highcharts-line .options=${props.options ?? {}}></highcharts-line>`;
        },
        map: async () => {
            await import('./highcharts/highcharts-map.js');

            return (props: RendererProps) =>
                html`<highcharts-map .options=${props.options ?? {}}></highcharts-map>`;
        },
        'small-multiple': async () => {
            await import('./highcharts/highcharts-small-multiple.js');

            return (props: RendererProps) =>
                html`<highcharts-small-multiple
                    .options=${props.options ?? {}}
                ></highcharts-small-multiple>`;
        },
    },
    echarts: {
        line: async () => {
            await import('./echarts/echarts-line.js');

            return (props: RendererProps) =>
                html`<echarts-line .options=${props.options ?? {}}></echarts-line>`;
        },
    },
};
