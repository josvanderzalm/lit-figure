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
    options: Options;
    data?: DataArray;
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
// Request options
export interface RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
    url: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
    mode?: RequestMode;
    credentials?: RequestCredentials;
    cache?: RequestCache;
    redirect?: RequestRedirect;
    referrer?: string;
    integrity?: string;
    keepalive?: boolean;
    signal?: AbortSignal | null;
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

    /** Key used for pivoting data (e.g., field name) */
    pivotField?: string;

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

    /** Height of the chart container; accepts a string (e.g., "400px", "50%") or a number (e.g., 400 → "400px"). */
    height?: string | number;

    //** Width of the chart container; accepts a string (e.g., "400px", "50%") or a number (e.g., 400 → "400px"). */
    width?: string | number;

    /** X-axis configuration */
    xAxis?: AxisOptions;

    /** Y-axis configuration */
    yAxis?: AxisOptions;

    /** Keep note of config loaded status */
    configFetched?: boolean;

    /** Keep note of data loaded status */
    dataFetched?: boolean;
}
