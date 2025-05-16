export async function loadROSansFonts() {
    try {
        const fontVariants = [
            {
                name: 'RO Sans',
                url: '/assets/fonts/ROSansText-Regular.woff2',
                weight: 'normal',
                style: 'normal',
            },
            {
                name: 'RO Sans',
                url: '/assets/fonts/ROSansText-Bold.woff2',
                weight: 'bold',
                style: 'normal',
            },
            {
                name: 'RO Sans',
                url: '/assets/fonts/ROSansText-Italic.woff2',
                weight: 'normal',
                style: 'italic',
            },
            {
                name: 'RO Sans',
                url: '/assets/fonts/ROSerif-BoldItalic.woff2',
                weight: 'bold',
                style: 'italic',
            },
        ];
        const loadedFonts = await Promise.all(
            fontVariants.map(({ name, url, weight, style }) =>
                new FontFace(name, `url(${url}) format('woff2')`, {
                    weight,
                    style,
                    display: 'swap',
                }).load(),
            ),
        );

        loadedFonts.forEach((font) => document.fonts.add(font));
    } catch (error) {
        console.error('Error loading RO Sans font variations:', error);
        throw error;
    }
}
