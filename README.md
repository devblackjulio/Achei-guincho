# Site institucional — Achei Guincho

Site público da plataforma. Duas funções no mesmo projeto:

1. **Home** — apresentação do serviço, dos dois apps (cliente e prestador) e
   call to action para pedir socorro.
2. **Páginas legais** — Política de Privacidade, Exclusão de conta, Termos de
   Uso e Contato. As duas primeiras são **obrigatórias** na ficha da Google
   Play e precisam de URL pública, sem login.

Stack: **Vite 7 + React 19 + TypeScript + Tailwind 4**. Sem framework de
servidor — a saída é HTML estático, servível por qualquer host.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o dist/ localmente
```

## Páginas e URLs

O build é **multi-página**: cada arquivo abaixo é uma entrada real do Vite e
sai como HTML próprio dentro de `dist/`. Isso não é detalhe de organização —
a Google Play testa URLs exatas e um SPA de rota única devolveria 404 nelas.

| Arquivo | Conteúdo | Obrigatória na Play |
|---|---|---|
| `index.html` | Home | — |
| `privacidade.html` | Política de Privacidade (LGPD) | **Sim** — ficha da loja |
| `exclusao-de-conta.html` | Como excluir conta e dados | **Sim** — Segurança dos dados |
| `termos.html` | Termos de Uso | Não |
| `contato.html` | Contato e suporte | Não |

> As URLs **não mudaram** em relação à versão anterior do site. Se você já
> colou `https://<dominio>/privacidade.html` e
> `https://<dominio>/exclusao-de-conta.html` no Play Console, não precisa
> trocar nada.

## Estrutura

```
index.html                 entrada da home
privacidade.html           ┐
exclusao-de-conta.html     │ entradas das páginas legais
termos.html                │
contato.html               ┘
vite.config.ts             build multi-página (declara as 5 entradas)
src/
  main.tsx                 entradas: main.tsx + main-{privacidade,exclusao,termos,contato}.tsx
  App.tsx                  composição da home
  index.css                tokens de cor/tipografia (Tailwind @theme)
  components/              Nav, Hero, HeroScene (3D), HowItWorks, LazyMount,
                           Preloader, seções, Footer, PedidoModal
  three/                   RouteScene (demo 3D do "Como funciona") e truck.ts
                           (o modelo do guincho em geometria Three.js)
  pages/
    LegalPage.tsx          casca comum das 4 páginas legais
    legais.css             tipografia de prosa + regras de impressão
    Privacidade.tsx        ┐
    ExclusaoDeConta.tsx    │ conteúdo legal em TSX
    Termos.tsx             │
    Contato.tsx            ┘
  lib/data.ts              textos, serviços, FAQ, contatos
dist/                      saída do build (não versionada)
```

## Deploy

Publique a pasta **`dist/`** — nada além dela.

| Host | Configuração |
|---|---|
| Cloudflare Pages | build `npm run build`, output `dist` |
| Netlify | idem |
| Vercel | idem (preset Vite) |
| GitHub Pages / servidor próprio | copiar `dist/` para a raiz pública |

Depois de publicar, abra as duas URLs obrigatórias **em aba anônima e de fora
da sua rede** — é exatamente o teste que o robô do Play Console faz.

## Pendências antes de considerar o site "fechado"

- [ ] **Razão social e CNPJ** — o rodapé hoje não exibe CNPJ (o valor anterior
      era fictício). Se a empresa quiser exibir, preencha em
      `src/components/Footer.tsx`.
- [ ] **Foro** — o item 10 dos Termos ainda tem o marcador
      `[cidade/UF do prestador do serviço]` em `src/pages/Termos.tsx`.
- [x] **Link da Google Play** — os botões da home já apontam para as fichas
      reais: `com.devblack.acheiguincho.cliente` e
      `com.devblack.acheiguincho.prestador` (constantes em `src/lib/data.ts`).
- [ ] **Imagem de compartilhamento** (`og:image`) — hoje não existe; redes
      sociais mostram só título e descrição.

## Observação sobre dados

Os textos de depoimentos, número de guincheiros e avaliações exibidos na home
são **ilustrativos**. A versão anterior do site exibia um telefone 0800, um
endereço e um CNPJ que não existiam; foram removidos. Antes de publicar,
revise `src/lib/data.ts` e os componentes de seção para garantir que nenhum
número ou depoimento fictício seja apresentado como real — declaração
enganosa é motivo de rejeição na Google Play.

## Sobre a demonstração 3D

A seção "Como funciona" tem uma maquete 3D (Three.js) em que um guincho
percorre a rota até o veículo parado, com os quatro passos do texto
acompanhando a animação.

- **Duas cenas WebGL na home.** O hero também usa Three.js. Para não manter
dois contextos GPU vivos ao mesmo tempo, a maquete só é criada quando a seção
se aproxima da viewport (`src/components/LazyMount.tsx`).
- **Cores.** O modelo usa a paleta do site (papel, âmbar, tinta), não a do
projeto de origem. A rota e o pino têm contorno escuro porque âmbar sobre
papel claro tem contraste baixo (~1,5:1) e sumia.
- **Acessibilidade.** O canvas é `aria-hidden`; quem usa leitor de tela lê
apenas o texto dos passos, que é completo sozinho. A animação respeita
`prefers-reduced-motion`.

## Tela de carregamento

A home abre com um overlay de progresso (0→100) em vez de entregar a página
no meio do carregamento do WebGL.

- **O progresso é real.** 0–85% avança conforme cada cena 3D avisa que
  desenhou o primeiro quadro (`onReady` em `HeroScene` e `RouteScene`); os
  últimos 15% ficam para fontes e imagens.
- **Nunca trava a página.** Há um teto de 9s: se o 3D falhar (contexto
  perdido, driver ruim), o site abre de qualquer forma. Preloader travado é
  pior que site sem preloader.
- **Piso de 900ms** para o overlay não piscar em conexões rápidas.
- **Rolagem travada** enquanto está de pé, e `prefers-reduced-motion` desliga
  as animações.
- A maquete 3D fica abaixo da dobra, então durante o boot ela é montada com
  `forceMount` — sem isso ela nunca avisaria "pronto" e o progresso pararia.

## Responsividade

Testado em 360, 390, 412 e 768px. Espaçamentos e tamanhos de título têm
degraus próprios para celular (`py-16 sm:py-24 md:py-32`, títulos em
`2.1rem` no mobile). A maquete 3D mede 300px de altura no celular e 560px no
desktop.
