import { defineConfig } from 'vite'
import { splitVendorChunkPlugin } from 'vite'

export default defineConfig({
    root: './src',
    publicDir: '../public',
    plugins: [splitVendorChunkPlugin()],
    assetsInclude: [
        '**/*.png',
    ],
    build: {
        assetsInlineLimit: 0,
        assetsDir: './assets',
        outDir: '../dist',
        emptyOutDir: true,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                assetFileNames: (asset) => {
                    console.log(asset)
                    return "assets/[hash][extname]"
                },
                chunkFileNames: (chunk) => {
                    console.log(chunk)
                    return "assets/[hash].js"
                },
            },
        },
    },
})