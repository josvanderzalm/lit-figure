// highcharts-column.ts

import type * as Highcharts from 'highcharts';
import { html } from 'lit';

import { dateStringToTimestamp } from '@/common/utils/data/date-string-to-timestamp';
import { HighchartsBaseChart } from '@/highcharts/base/base-chart';
import type { DataItem, Zone } from '@/types';

// SCOPED ELEMENT, DO NOT ADD: @customElement('highcharts-column')
export class HighchartsColumn extends HighchartsBaseChart {
    // Override to combine base options and additional chart options
    protected async getChartOptions(): Promise<Highcharts.Options> {
        const options = this.options;
        const data = this.getFigureData();
        const chartOptions: Highcharts.Options = {
            chart: {
                type: 'column',
                width: options.width === '100%' ? null : parseInt(options.width as string, 10),
                height: parseInt(options.height as string, 10) || 400,
            },
            xAxis: {
                type: (options.xAxis as Highcharts.XAxisOptions)?.type,
                title: {
                    text: options.xAxis?.title || '',
                },
                plotBands:
                    options.xAxis?.zones?.map((zone: Zone) => ({
                        from: dateStringToTimestamp(zone.from),
                        to: dateStringToTimestamp(zone.to),
                        color: 'rgba(200, 200, 200, 0.2)',
                        label: {
                            text: zone.label,
                            style: {
                                color: '#666',
                                fontSize: '10px',
                            },
                        },
                    })) || [],
            },
            yAxis: {
                title: {
                    text: options['y-axis']?.title || '',
                },
            },
            series: [
                {
                    type: 'column',
                    name: options.yKey || 'Data',
                    data: data?.map((item: DataItem) => {
                        const x =
                            (options.xAxis as Highcharts.XAxisOptions)?.type === 'datetime'
                                ? dateStringToTimestamp(item[options.xKey] as string)
                                : item[options.xKey];
                        const y =
                            options['y-axis']?.type === 'datetime'
                                ? dateStringToTimestamp(item[options.yKey] as string)
                                : item[options.yKey];

                        return [x, y];
                    }),
                },
            ],
        };

        return this.mergeOptions(await super.getChartOptions(), chartOptions);
    }

    render() {
        return html`<p>highcharts-column</p>
            ${super.render()}`;
    }
}
