/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            rollupTypes: true,
            insertTypesEntry: true,
        }),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
    },
    build: {
        rollupOptions: {
            output: {
                preserveModules: true,
            },
        },
        lib: {
            // eslint-disable-next-line no-undef
            entry: resolve(__dirname, 'src/index.ts'),
            fileName: (format, filename) => `${filename}.js`,
            formats: ['es'],
        },
    },
});
