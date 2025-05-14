import type * as Highcharts from 'highcharts';

import { HighchartsBase } from '@/components/highcharts/highcharts-base';

export class HighchartsBaseChart extends HighchartsBase {
    private highchartsBAseChartOptions: Highcharts.Options = {
        chart: {
            type: 'line',
        },
    };

    protected override getChartOptions(): Highcharts.Options {
        return this.deepmerge(super.getChartOptions(), this.highchartsBAseChartOptions);
    }
}
