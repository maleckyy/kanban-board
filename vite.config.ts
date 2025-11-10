import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            injectRegister: 'auto',
            includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
            manifest: {
                name: "2Manage",
                short_name: "2Manage",
                description: "Kanban board and task manager",
                display: "standalone",
                start_url: "/",
                icons: [{
                    src: "logo_192.png",
                    sizes: "192x192",
                    type: "image/png"
                }, {
                    src: "web-app-manifest-512x512.png",
                    sizes: "512x512",
                    type: "image/png"
                }, {
                    src: "logo_512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any maskable"
                }]
            }
        })],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
