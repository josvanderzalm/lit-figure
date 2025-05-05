function toJson<T>(text: string | T): T {
    if (typeof text !== 'string') return text;
    try {
        return JSON.parse(text) as T;
    } catch (error) {
        console.error('Fout bij het parsen van JSON:', error);
        return {} as T;
    }
}

export { toJson };
