import { html } from 'lit';

import type { RendererProps } from '@/types';

export const rivmSmvdRegistry = {
    common: {
        sandbox: async () => {
            const { SandboxWrapper } = await import('./components/sandbox/sandbox.js');

            return {
                template: (props: RendererProps) =>
                    html`<common-sandbox .options=${props.options ?? {}}></common-sandbox>`,
                module: SandboxWrapper,
            };
        },
    },
    highcharts: {
        column: async () => {
            const { HighchartsColumn } = await import('../highcharts/components/column.js');

            return {
                template: (props: RendererProps) =>
                    html`<highcharts-column .options=${props.options ?? {}}></highcharts-column>`,
                module: HighchartsColumn,
            };
        },
        composite: async () => {
            const { HighchartsComposite } = await import('../highcharts/components/composite.js');

            return {
                template: (props: RendererProps) =>
                    html`<highcharts-composite
                        .options=${props.options ?? {}}
                    ></highcharts-composite>`,
                module: HighchartsComposite,
            };
        },
        line: async () => {
            const { HighchartsLine } = await import('../highcharts/components/line.js');

            return {
                template: (props: RendererProps) =>
                    html`<highcharts-line .options=${props.options ?? {}}></highcharts-line>`,
                module: HighchartsLine,
            };
        },
        map: async () => {
            const { HighchartsMap } = await import('../highcharts/components/map.js');

            return {
                template: (props: RendererProps) =>
                    html`<highcharts-map .options=${props.options ?? {}}></highcharts-map>`,
                module: HighchartsMap,
            };
        },
        'small-multiple': async () => {
            const { HighchartsSmallMultiple } = await import(
                '../highcharts/components/small-multiple.js'
            );

            return {
                template: (props: RendererProps) =>
                    html`<highcharts-small-multiple
                        .options=${props.options ?? {}}
                    ></highcharts-small-multiple>`,
                module: HighchartsSmallMultiple,
            };
        },
    },
    echarts: {
        line: async () => {
            const { EchartsLine } = await import('../echarts/components/line.js');

            return {
                template: (props: RendererProps) =>
                    html`<echarts-line .options=${props.options ?? {}}></echarts-line>`,
                module: EchartsLine,
            };
        },
    },
};
