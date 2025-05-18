//import type * as Highcharts from 'highcharts';

//import { html } from 'lit';

//import { dateStringToTimestamp } from '@/common/utils/data/date-string-to-timestamp';
import { HighchartsBaseChart } from '@/highcharts/base/base-chart';

//import type { ActionItem, DataItem, Zone } from '@/types';

// SCOPED ELEMENT, DO NOT ADD: @customElement('highcharts-small-multiple')
export class HighchartsSmallMultiple extends HighchartsBaseChart {
    // private chartIds: string[] = [];
    // protected override getButtons(): ActionItem[] {
    //     return this.unsetButtons(super.getButtons(), [
    //         'download-png',
    //         'download-svg',
    //         'download-pdf',
    //     ]);
    // }
    // protected override async renderChart(): Promise<void> {
    //     const Highcharts = await this.getHighchartsInstance();
    //     await import('highcharts/modules/drilldown');
    //     const groupedData = this.getGroupedData();
    //     groupedData.forEach((group, index) => {
    //         const containerId = this.chartIds[index];
    //         const container = this.shadowRoot?.getElementById(containerId);
    //         if (!container) return;
    //         const chartOptions = this.getChartOptionsForGroup(group.name, group.data, index);
    //         Highcharts.chart(container, chartOptions);
    //     });
    // }
    // private getGroupedData(): { name: string; data: DataItem[] }[] {
    //     const data = this.getFigureData();
    //     const key = this.options.seriesKey;
    //     if (!key) return [{ name: 'All', data }];
    //     const groups: Record<string, DataItem[]> = {};
    //     data.forEach((item) => {
    //         const groupKey = item[key] || 'Unknown';
    //         if (!groups[groupKey]) groups[groupKey] = [];
    //         groups[groupKey].push(item);
    //     });
    //     return Object.entries(groups).map(([name, data]) => ({ name, data }));
    // }
    // private async getChartOptionsForGroup(
    //     name: string,
    //     data: DataItem[],
    //     index: number,
    // ): Promise<Highcharts.Options> {
    //     const options = this.options;
    //     console.log(index);
    //     return this.mergeOptions(super.getChartOptions(), {
    //         chart: {
    //             type: 'column',
    //             height: 200,
    //             width: 300,
    //         },
    //         //colors: this.colorOffset(index),
    //         title: {
    //             text: name,
    //             style: {
    //                 fontSize: '15px',
    //                 fontWeight: 'bold',
    //                 color: '#154273',
    //             },
    //         },
    //         xAxis: {
    //             type: (options.xAxis as Highcharts.XAxisOptions)?.type,
    //             title: {
    //                 text: options.xAxis?.title || '',
    //             },
    //             plotBands:
    //                 options.xAxis?.zones?.map((zone: Zone) => ({
    //                     from: dateStringToTimestamp(zone.from),
    //                     to: dateStringToTimestamp(zone.to),
    //                     color: 'rgba(200, 200, 200, 0.2)',
    //                     label: {
    //                         text: zone.label,
    //                         style: {
    //                             color: '#666',
    //                             fontSize: '10px',
    //                         },
    //                     },
    //                 })) || [],
    //         },
    //         yAxis: {
    //             title: {
    //                 text: options['y-axis']?.title || '',
    //             },
    //         },
    //         series: [
    //             {
    //                 type: 'column',
    //                 name: options.yKey || 'Data',
    //                 data: data.map((item) => {
    //                     const x =
    //                         (options.xAxis as Highcharts.XAxisOptions)?.type === 'datetime'
    //                             ? dateStringToTimestamp(item[options.xKey] as string)
    //                             : item[options.xKey];
    //                     const y =
    //                         options['y-axis']?.type === 'datetime'
    //                             ? dateStringToTimestamp(item[options.yKey] as string)
    //                             : item[options.yKey];
    //                     return [x, y];
    //                 }),
    //             },
    //         ],
    //     });
    // }
    // render() {
    //     const grouped = this.getGroupedData();
    //     this.chartIds = grouped.map((_, i) => `chart-${i}`);
    //     return html`highcharts-small-multiple${this.getHtmlTitle()}
    //         <div style="display: grid; gap: 16px;">
    //             ${grouped.map((_, index) => html`<div id="${this.chartIds[index]}"></div>`)}
    //         </div>
    //         ${super.render()}`;
    // }
}
