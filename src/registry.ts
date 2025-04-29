// src/registry.ts
import { html } from 'lit';

export const registry = {
  highcharts: {
    line: async () => {
      await import('./components/highcharts/highcharts-line.js');
      return (props: any) =>
        html`<highcharts-line .config=${props.config} .data=${props.data}></highcharts-line>`;
    },
    composite: async () => {
      await import('./components/highcharts/highcharts-composite.js');
      return (props: any) =>
        html`<highcharts-composite .config=${props.config} .data=${props.data}></highcharts-composite>`;
    }
  },
  echarts: {
    line: async () => {
      await import('./components/echarts/echarts-line.js');
      return (props: any) =>
        html`<echarts-line .config=${props.config} .data=${props.data}></echarts-line>`;
    },
    composite: async () => {
      await import('./components/echarts/echarts-composite.js');
      return (props: any) =>
        html`<echarts-composite .config=${props.config} .data=${props.data}></echarts-composite>`;
    }
  }
};
