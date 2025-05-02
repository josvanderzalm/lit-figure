import { html } from 'lit';

export const registry = {
  sandbox: async () => {
    await import('./sandbox/sandbox-iframe.js');
    return (props: any) =>
      html`<sandbox-iframe .config=${props.config} .data=${props.data}></sandbox-iframe>`;
  },
  highcharts: {
    line: async () => {
      await import('./highcharts/highcharts-line.js');
      return (props: any) =>
        html`<highcharts-line .config=${props.config} .data=${props.data}></highcharts-line>`;
    },
    composite: async () => {
      await import('./highcharts/highcharts-composite.js');
      return (props: any) =>
        html`<highcharts-composite .config=${props.config} .data=${props.data}></highcharts-composite>`;
    }
  },
  echarts: {
    line: async () => {
      await import('./echarts/echarts-line.js');
      return (props: any) =>
        html`<echarts-line .config=${props.config} .data=${props.data}></echarts-line>`;
    },
    composite: async () => {
      await import('./echarts/echarts-composite.js');
      return (props: any) =>
        html`<echarts-composite .config=${props.config} .data=${props.data}></echarts-composite>`;
    }
  }
};
