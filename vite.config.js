import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/liveRegion.js'),
      name: 'LiveRegion',
      fileName: (format) => `liveRegion.${format === 'es' ? 'mjs' : 'js'}`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'test/']
    }
  }
});