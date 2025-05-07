import type * as Highcharts from 'highcharts';

import { HighchartsBase } from '@/components/highcharts/higcharts-base';

export class HighchartsBaseMap extends HighchartsBase {
    protected highchartsDefaults: Highcharts.Options = {
        chart: {
            type: 'map',
        },
    };

    protected override getChartOptions(): Highcharts.Options {
        return {
            ...super.getChartOptions(),
            ...this.highchartsDefaults,
        };
    }
}
