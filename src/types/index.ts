import { EChartsOption as EchartsOptions } from 'echarts';
import { Options as HighchartsOptions } from 'highcharts';

// Re-export the chart config types
export type { EchartsOptions, HighchartsOptions };

// Optional: Stronger type for data items
export type DataItem = Record<string, unknown>;

// data array
export type DataArray = { [key: string]: string | number }[];

// Renderer props
export type RendererProps = {
    config: Options;
    data: DataArray;
};

// Renderer function type
export type RendererFunction = (props: RendererProps) => unknown;

// Registry for dynamic imports
export type Registry = Record<
    string,
    Record<string, () => Promise<RendererFunction>>
>;

// Axis configuration
export interface AxisZone {
    /** Start of the zone (e.g., date or number) */
    from?: string;
    /** End of the zone */
    to?: string;
    /** Optional label for this zone */
    label?: string;
    /** Zone type, e.g., "range", "highlight", etc. */
    type?: string;
}

export interface AxisOptions {
    /** Axis title (overrides auto-generated) */
    title?: string;
    /** Label format or override */
    label?: string;
    /** Optional highlight zones */
    zones?: AxisZone[];
}

// Main configuration object
export interface Options {
    /** Charting library to use */
    library?: 'highcharts' | 'echarts';

    /** Library-specific configuration object */
    libraryOptions?: EchartsOptions | HighchartsOptions;

    /** URL to external data source (JSON or CSV) */
    dataSrc?: string;

    /** URL to external config source (JSON) */
    configSrc?: string;

    /** Dataset to render */
    dataSet?: DataArray;

    /** Enable iframe sandboxing for isolation */
    sandbox?: boolean;

    /** Key used for x-axis (e.g., field name) */
    xKey?: string;

    /** Key used for y-axis (e.g., field name or aggregated value) */
    yKey?: string;

    /** Label for x-axis */
    xLabel?: string;

    /** Label for y-axis */
    yLabel?: string;

    /** Main chart title */
    title?: string;

    /** Subtitle or additional context */
    subtitle?: string;

    /** Source reference (e.g., URL or string) */
    source?: string;

    /** Chart type (e.g., "line", "bar", "sankey") */
    type?: string;

    /**
     * CSS height of the chart container.
     * - Can be a string like `"400px"`, `"50%"`, or a raw number interpreted as pixels.
     * - Example: `"100%"` or `400` (which becomes `"400px"`).
     */
    height?: string | number;

    /**
     * CSS width of the chart container.
     * - Can be a string like `"400px"`, `"50%"`, or a raw number interpreted as pixels.
     * - Example: `"100%"` or `400` (which becomes `"400px"`).
     */
    width?: string | number;

    /** X-axis configuration */
    xAxis?: AxisOptions;
}
