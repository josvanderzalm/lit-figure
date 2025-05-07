import type * as Highcharts from 'highcharts';

import { HighchartsBase } from '@/components/highcharts/higcharts-base';

export class HighchartsBaseChart extends HighchartsBase {
    protected highchartsDefaults: Highcharts.Options = {
        chart: {
            type: 'line',
        },
    };

    protected override getChartOptions(): Highcharts.Options {
        return {
            ...super.getChartOptions(),
            ...this.highchartsDefaults,
        };
    }
}
