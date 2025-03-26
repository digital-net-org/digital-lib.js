import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, type UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { digitalLibConstants } from './digital-lib-constants';

export default class ViteBuilder {
    public static buildConfig(config?: {
        constants?: Record<string, any>;
        port?: number;
        alias?: Record<string, string>;
        additionalPlugins?: UserConfig['plugins'];
        assets?: Record<string, string>;
    }) {
        return defineConfig({
            define: {
                global: 'globalThis',
                ...this.resolveConstants({ ...digitalLibConstants, ...config?.constants }),
            },
            server: {
                port: config?.port,
            },
            resolve: {
                alias: config?.alias,
            },
            css: {
                modules: {
                    localsConvention: 'camelCase',
                },
            },
            build: {
                outDir: 'dist',
                rollupOptions: {
                    input: {
                        main: resolve(__dirname, 'index.html'),
                        lib: resolve(__dirname, 'src/index.tsx'),
                        ...config?.assets,
                    },
                    output: {
                        compact: true,
                        strict: true,
                        format: 'esm',
                        sourcemap: false,
                        entryFileNames: '[hash].js',
                        chunkFileNames: '[hash].js',
                        assetFileNames: 'assets/[name][extname]',
                    },
                },
            },
            test: {
                globals: true,
                environment: 'jsdom',
            },
            plugins: [
                react(),
                checker({ typescript: true }),
                ...(config?.additionalPlugins ? config?.additionalPlugins : []),
            ],
        });
    }

    public static resolveConstants(constants: Record<string, any>) {
        return Object.entries(constants).reduce(
            (acc, [key, value]) => {
                acc[key] = JSON.stringify(value);
                return acc;
            },
            {} as Record<string, any>
        );
    }
}
