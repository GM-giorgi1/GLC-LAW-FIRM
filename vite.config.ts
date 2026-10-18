import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function serveTempMediaPlugin(): Plugin {
  return {
    name: 'serve-tempmedia',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/.tempmediaStorage/')) {
          const cleanUrl = decodeURIComponent(req.url.split('?')[0]);
          const fileName = path.basename(cleanUrl);
          const candidatePaths = [
            path.resolve(__dirname, 'public/.tempmediaStorage', fileName),
            path.resolve(__dirname, '.tempmediaStorage', fileName),
            path.resolve(__dirname, 'public', fileName),
          ];
          for (const filePath of candidatePaths) {
            if (fs.existsSync(filePath)) {
              const ext = path.extname(filePath).toLowerCase();
              const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';
              res.setHeader('Content-Type', contentType);
              return fs.createReadStream(filePath).pipe(res);
            }
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), serveTempMediaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'next/image': path.resolve(__dirname, 'src/shims/next-image.tsx'),
        'next/link': path.resolve(__dirname, 'src/shims/next-link.tsx'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
