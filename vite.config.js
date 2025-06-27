import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ command, ssrBuild }) => {
  const isSSR = !!ssrBuild;

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      host: true,
    },
    build: {
      ssr: isSSR ? 'src/entry-server.js' : false,
      outDir: isSSR ? 'dist/server' : 'dist/client',
      manifest: !isSSR,
      emptyOutDir: false,
      rollupOptions: {
        input: !isSSR ? './index.html' : undefined,
      },
    },
    ssr: {
      noExternal: ['vue', 'vue-router'], // keep for SSR bundling
    },
  };
});
