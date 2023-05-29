import { defineConfig } from 'vite'
import { splitVendorChunkPlugin } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    root: './src',
    publicDir: '../public',
    plugins: [
        splitVendorChunkPlugin(),
        tsconfigPaths(),
    ],
    assetsInclude: [
        '**/*.png',
        '**/*.fnt',
    ],
    build: {
        assetsInlineLimit: 0,
        assetsDir: './assets',
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                assetFileNames: (asset) => {
                    console.log(asset)
                    return "assets/[name][extname]"
                },
                chunkFileNames: (chunk) => {
                    console.log(chunk)
                    return "assets/[name].js"
                },
            },
        },
    },
})