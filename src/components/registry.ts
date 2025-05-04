import { html } from "lit";

import type { RendererProps } from "@/types";

export const registry = {
  sandbox: async () => {
    await import("./sandbox/sandbox-iframe.js");
    return (props: RendererProps) =>
      html`<sandbox-iframe
        .config=${props.config}
        .data=${props.data}
      ></sandbox-iframe>`;
  },
  highcharts: {
    line: async () => {
      await import("./highcharts/highcharts-line.js");
      return (props: RendererProps) =>
        html`<highcharts-line
          .config=${props.config}
          .data=${props.data}
        ></highcharts-line>`;
    },
    composite: async () => {
      await import("./highcharts/highcharts-composite.js");
      return (props: RendererProps) =>
        html`<highcharts-composite
          .config=${props.config}
          .data=${props.data}
        ></highcharts-composite>`;
    },
  },
  echarts: {
    line: async () => {
      await import("./echarts/echarts-line.js");
      return (props: RendererProps) =>
        html`<echarts-line
          .config=${props.config}
          .data=${props.data}
        ></echarts-line>`;
    },
    composite: async () => {
      await import("./echarts/echarts-composite.js");
      return (props: RendererProps) =>
        html`<echarts-composite
          .config=${props.config}
          .data=${props.data}
        ></echarts-composite>`;
    },
  },
};
