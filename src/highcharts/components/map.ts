import type * as Highcharts from 'highcharts';

import { HighchartsBaseMap } from '@/highcharts/base/base-map';

// SCOPED ELEMENT, DO NOT ADD: @customElement('highcharts-map')
export class HighchartsMap extends HighchartsBaseMap {
    private geojson: Highcharts.GeoJSON = null;

    override async connectedCallback(): Promise<void> {
        super.connectedCallback();
        await this.loadGeojson();
        this.requestUpdate(); // re-render once map is loaded
    }

    private async loadGeojson(): Promise<void> {
        const response = await fetch('http://localhost:5173/assets/shapes/gm_2025.geojson');

        if (!response.ok) {
            console.error('Failed to load map data');

            return;
        }
        this.geojson = await response.json();
    }

    protected override async getChartOptions(): Promise<Highcharts.Options> {
        const chartOptions: Highcharts.Options = {
            chart: {
                map: this.geojson,
            },

            accessibility: {
                typeDescription: 'Map of the Netherlands',
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom',
                },
            },

            colorAxis: {
                tickPixelInterval: 100,
            },

            series: [
                {
                    type: 'map',
                    data: this.options.dataSet.map((item) => ({
                        code: item[this.options.mapRegionKey],
                        value: Number(item[this.options.mapKey]),
                    })),
                    joinBy: ['gm_code', 'code'],
                    name: 'Random data',
                },
            ],
        };

        return this.mergeOptions(await super.getChartOptions(), chartOptions);
    }
}
