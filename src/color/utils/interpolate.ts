import { rgbToHex } from './rgb-to-hex';

export function interpolateColor(
    from: [number, number, number],
    to: [number, number, number],
    t: number,
): string {
    const result: [number, number, number] = [
        from[0] + (to[0] - from[0]) * t,
        from[1] + (to[1] - from[1]) * t,
        from[2] + (to[2] - from[2]) * t,
    ];

    return rgbToHex(result);
}
