export function hexToRgb(hex: string): [number, number, number] {
    const match = hex.replace('#', '').match(/.{1,2}/g);

    if (!match || match.length !== 3) throw new Error('Invalid hex color');

    return match.map((val) => parseInt(val, 16)) as [number, number, number];
}
