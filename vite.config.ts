import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Build MULTI-PÁGINA.
 *
 * O site não é só a home: a Google Play exige duas URLs públicas e estáveis,
 * /privacidade.html e /exclusao-de-conta.html, e elas já estão cadastradas no
 * Console. Um SPA de rota única responderia 404 nessas URLs no robô da loja.
 * Por isso cada página é uma entrada real do Vite e sai como HTML próprio em
 * dist/ — mesma URL de antes, mesma regra de hospedagem (arquivo estático).
 *
 * Cada página sai como HTML próprio em dist/ recebendo os bundles de
 * dist/assets/. O inline do vite-plugin-singlefile não pode ser usado aqui:
 * ele fixa output.inlineDynamicImports, que o Rollup recusa com mais de um
 * input. Todo host estático (Vercel, Netlify, Cloudflare Pages, GitHub Pages)
 * serve a pasta com os assets ao lado sem configuração extra.
 */
const page = (name: string) => path.resolve(__dirname, `${name}.html`);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: page("index"),
        privacidade: page("privacidade"),
        "exclusao-de-conta": page("exclusao-de-conta"),
        termos: page("termos"),
        contato: page("contato"),
      },
    },
  },
});
