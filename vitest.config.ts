import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,       // umożliwia użycie np. "describe", "it" bez importów
        environment: 'jsdom', // środowisko dla React
        setupFiles: './src/setupTests.ts', // opcjonalnie dla setup np. matchers
        coverage: {
            reporter: ['text', 'json', 'html'], // raport pokrycia
        },
    },
});