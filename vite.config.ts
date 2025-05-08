import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths()],
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                sandbox: 'sandbox-iframe.html',
            },
            output: {
                entryFileNames: 'assets/main.js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },
    },
});
