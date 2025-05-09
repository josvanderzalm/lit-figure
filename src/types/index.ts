import { EChartsOption as EchartsOptions } from 'echarts';
import { Options as HighchartsOptions } from 'highcharts';

// Re-export the chart config types
export type { EchartsOptions, HighchartsOptions };

// Define the ActionItem type
export interface ActionItemBase {
    id: string;
    label: string;
    icon?: string;
}

export interface ButtonActionItem extends ActionItemBase {
    type: 'button';
    action: () => void;
}

export interface GroupActionItem extends ActionItemBase {
    type: 'group';
    children: ActionItem[];
}

export type ActionItem = ButtonActionItem | GroupActionItem;
export interface AxisOptions {
    /** Axis title (overrides auto-generated) */
    title?: string;
    /** Label format or override */
    label?: string;
    /** Optional highlight zones */
    zones?: AxisZone[];
}

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

// Button definition type
export type ButtonDef = {
    label: string;
    action?: () => void; // optional if it's a parent menu
    children?: ButtonDef[]; // sub-menu
    icon?: string; // optional, for styling
};

// data array
export type DataArray = { [key: string]: string | number }[];

// Optional: Stronger type for data items
export type DataItem = Record<string, unknown>;

// Main configuration object
export interface Options {
    /** The color scheme to use */
    colorScheme?: 'standard' | 'gender' | 'gender-alternative';

    /** Offset for color scheme */
    colorSchemeOffset?: number;

    /** Keep note of config loaded status */
    configFetched?: boolean;

    /** URL to external config source (JSON) */
    configSrc?: string;

    /** Dataset to render */
    dataSet?: DataArray;

    /** Keep note of data loaded status */
    dataFetched?: boolean;

    /** URL to external data source (JSON or CSV) */
    dataSrc?: string;

    /** Enable exporting function */
    exportable?: boolean;

    /** Height of the chart container; accepts a string (e.g., "400px", "50%") or a number (e.g., 400 → "400px"). */
    height?: string | number;

    /** Charting library to use */
    library?: 'highcharts' | 'echarts';

    /** Library-specific configuration object */
    libraryOptions?: EchartsOptions | HighchartsOptions;

    /** The  language of the visualisation, default to doc language */
    lang?: 'en' | 'nl';

    /** administrative area division code */
    mapDivisionCode?: string;

    /** the year of the administrative area division code */
    mapDivisionYear?: string;

    /** Key used for pivoting data (e.g., field name) */
    pivotField?: string;

    /** Enable iframe sandboxing for isolation */
    sandbox?: boolean;

    /** Source reference (e.g., URL or string) */
    source?: string;

    /** Subtitle or additional context */
    subtitle?: string;

    /** Main chart title */
    title?: string;

    /** Chart type (e.g., "bar", "line", "sankey") */
    type?: string;

    /** Width of the chart container; accepts a string (e.g., "400px", "50%") or a number (e.g., 400 → "400px"). */
    width?: string | number;

    /** Key used for x-axis (e.g., field name) */
    xKey?: string;

    /** Label for x-axis */
    xLabel?: string;

    /** X-axis configuration */
    xAxis?: AxisOptions;

    /** Key used for y-axis (e.g., field name or aggregated value) */
    yKey?: string;

    /** Label for y-axis */
    yLabel?: string;

    /** Y-axis configuration */
    yAxis?: AxisOptions;
}

// Registry for dynamic imports
export type Registry = Record<string, Record<string, () => Promise<RendererFunction>>>;

// Renderer function type
export type RendererFunction = () => unknown;

export type RendererProps = {
    /** Options for the chart */
    options?: Options;
    /** Data to be rendered */
    data?: DataArray;
    /** Optional callback for when the chart is ready */
};

export interface Zone {
    from: string;
    to: string;
    label?: string;
}
