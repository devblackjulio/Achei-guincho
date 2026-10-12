# Site institucional — Achei Guincho

Site estático (HTML + CSS, sem build, sem JavaScript) com as páginas que a
**Google Play** exige na ficha dos apps. Pasta criada pelo projeto — o nome
`site-intitucional` veio com o "ti" trocado; renomear para `site-institucional`
é só mover a pasta (nenhum link interno depende do nome).

## Arquivos

```
site-intitucional/
├── index.html                 home institucional (quem somos, apps, links)
├── privacidade.html           Política de Privacidade  ← URL exigida pelo Play
├── exclusao-de-conta.html     Exclusão de conta         ← URL exigida pelo Play
├── termos.html                Termos de uso
├── contato.html               Contato e suporte
├── assets/style.css           estilo único, paleta do app (#50DCAA / #1F1F1F)
└── README.md                  este arquivo
```

## Onde colar as URLs no Play Console

O Console está acusando 2 problemas ("Página não encontrada"):

| Problema | Campo no Console | URL |
|---|---|---|
| Política de Privacidade | Ficha da loja → **Política de privacidade** | `https://<SEU-DOMINIO>/privacidade.html` |
| Exclusão de conta | **Segurança dos dados** → declaração → link para excluir conta | `https://<SEU-DOMINIO>/exclusao-de-conta.html` |

O `https://` precisa ser público (acessível sem login, fora da rede local) — é
isso que o robô do Console testa e que hoje responde 404.

## Subir no ar

É site estático: qualquer hospedagem serve.

- **Cloudflare Pages / Netlify / Vercel**: aponte a pasta `site-intitucional`
  como diretório de publicação. Sem build command.
- **GitHub Pages**: publique a pasta na raiz do branch.
- Servidor próprio: copie a pasta para o diretório de `root` do nginx/apache.

Depois de publicar, abra as duas URLs no navegador anônimo (e por fora da sua
rede) antes de colar no Console.

## Antes de publicar — preencher

- [x] `acheiguinchoapp@gmail.com` e WhatsApp/telefone `+55 62 9498-9472` —
      preenchidos no site e no app (tela Ajuda e Suporte).
- [ ] Razão social/CNPJ do controlador (seção 1 da privacidade).
- [ ] Cidade/UF do foro (seção 10 dos termos).
- [ ] Telefone/WhatsApp de atendimento, se quiser publicar (hoje só e-mail).

## Verificação rápida local

```bash
cd site-intitucional && python3 -m http.server 8090
# abre http://localhost:8090/ e navega em todas as páginas
```

## Depois que o site estiver no ar

1. Colar as duas URLs no Play Console (ficha + segurança dos dados).
2. Conferir no LEIA-ME do `apks/store-listing/` a checklist restante da loja
   (classificação de conteúdo, credenciais de teste, etc.).
