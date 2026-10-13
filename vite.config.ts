import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Automatically detect GitHub Pages repository name in GitHub Actions environment
  // e.g. GITHUB_REPOSITORY = "kumarharsh0720/portfolio" -> repoName = "portfolio"
  const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
  const isUserPage = repoName.toLowerCase().endsWith('.github.io');
  
  // If VITE_BASE_URL is set, use it; otherwise use repo path in GitHub Actions, or fallback to relative './'
  const base = process.env.VITE_BASE_URL
    ? process.env.VITE_BASE_URL
    : process.env.GITHUB_REPOSITORY
      ? (isUserPage ? '/' : `/${repoName}/`)
      : './';

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
