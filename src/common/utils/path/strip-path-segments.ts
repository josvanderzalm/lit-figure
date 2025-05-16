export function stripPathSegments(url: string, count: number): string {
    const newUrl = new URL(url);
    const parts = newUrl.pathname.split('/');
    const newPath = parts.slice(0, Math.max(1, parts.length - count)).join('/');

    newUrl.pathname = newPath.endsWith('/') ? newPath : newPath + '/';

    return newUrl.href;
}
