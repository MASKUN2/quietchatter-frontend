/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://dev-api.quiet-chatter.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (_proxyReq, req) => {
            // Origin 헤더를 타겟 도메인으로 변경하여 서버가 로컬 요청을 거부하지 않도록 함
            // _proxyReq.setHeader('Origin', 'https://dev-api.quiet-chatter.com');
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            // 쿠키 보안 설정 제거 (로컬 http 환경에서 쿠키를 허용하기 위함)
            const setCookie = proxyRes.headers['set-cookie'];
            if (setCookie) {
              proxyRes.headers['set-cookie'] = setCookie.map(cookie =>
                cookie
                  .replace(/Secure/gi, '')
                  .replace(/SameSite=None/gi, 'SameSite=Lax')
                  .replace(/Domain=[^;]+/gi, '') // 도메인 설정 제거
              );
            }
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
})
