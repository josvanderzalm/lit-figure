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
                // Change this to your desired file name without a hash
                entryFileNames: 'assets/main.js', // This is for the entry point
                chunkFileNames: 'assets/[name]-[hash].js', // Customize chunk file names as needed
                assetFileNames: 'assets/[name]-[hash].[ext]', // Customize assets file names
            },
        },
    },
});
