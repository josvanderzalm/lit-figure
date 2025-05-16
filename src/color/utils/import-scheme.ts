import { registry } from '@/color/registry';
import type { ColorScheme } from '@/types';

type SteppedColorScheme = { [stepCount: string]: string[] };
type FlatColorScheme = string[];
type ColorSchemeType = SteppedColorScheme | FlatColorScheme;

export async function importColorScheme(
    name: ColorScheme = 'Standard',
    steps: number | undefined = undefined,
): Promise<string[] | SteppedColorScheme> {
    try {
        const importer = registry[name];

        if (!importer) {
            throw new Error(`Color scheme "${name}" not found in registry.`);
        }

        const module = await importer();
        const colorScheme: ColorSchemeType = module[name];

        if (!colorScheme) {
            throw new Error(`Color scheme "${name}" not found in module.`);
        }

        if (Array.isArray(colorScheme)) {
            return colorScheme;
        } else if (typeof colorScheme === 'object' && steps !== undefined) {
            const stepped = colorScheme[String(steps)];

            if (stepped) {
                return stepped;
            } else {
                throw new Error(`Color scheme "${name}" with ${steps} steps not found.`);
            }
        } else {
            throw new Error(`Invalid color scheme format for "${name}".`);
        }
    } catch (error) {
        console.error(`Error loading color scheme "${name}":`, error);
        throw new Error(`Color scheme "${name}" could not be loaded.`);
    }
}
