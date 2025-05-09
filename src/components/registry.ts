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
        line: async () => {
            await import('./highcharts/highcharts-line.js');

            return (props: RendererProps) =>
                html`<highcharts-line .options=${props.options ?? {}}></highcharts-line>`;
        },
        composite: async () => {
            await import('./highcharts/highcharts-composite.js');

            return (props: RendererProps) =>
                html`<highcharts-composite .options=${props.options ?? {}}></highcharts-composite>`;
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
