// Highcharts Sankey
import { customElement } from "lit/decorators.js";

import { BaseChart } from "../base/base-chart";

@customElement("highcharts-sankey")
export class HighchartsSankey extends BaseChart {
  async renderChart(container: HTMLElement) {
    const Highcharts = (await import("highcharts")).default;
    const sankey = await import("highcharts/modules/sankey");
    sankey.default(Highcharts);

    console.log(container, Highcharts);
    // Highcharts.chart(container, {
    //   ...this.config,
    //   series: this.data.series || [],
    // });
  }
}
