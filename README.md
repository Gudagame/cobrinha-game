# cobrinha-game

Jogos web da Gudagame.

| Jogo | Arquivo | Descrição |
|---|---|---|
| 🐍 Cobrinha | [`index.html`](index.html) | Jogo da cobrinha clássico. |
| 🐾 **Reino das Patinhas: A Última Defesa** | [`reino-das-patinhas/index.html`](reino-das-patinhas/index.html) | Tower Defense 3D (Three.js) educativo sobre saúde e bem-estar de cães e gatos. |

## Reino das Patinhas

- **Jogar online:** https://gudagame.github.io/cobrinha-game/reino-das-patinhas/ (após ativar o GitHub Pages)
- **Jogar local:** abra `reino-das-patinhas/index.html` no navegador (funciona direto do disco ou no GitHub Pages; precisa de internet para baixar o Three.js e as fontes).
- **Design completo (GDD):** [`reino-das-patinhas/GDD.md`](reino-das-patinhas/GDD.md) — conceito, loop, controles, 12 torres, 20 inimigos, 5 chefões, 40 perguntas, 30 cartões, itens, roteiro da fase 1, arte/áudio, dificuldade adaptativa, monetização ética e MVP.
- **Capas:** [`capa.jpg`](reino-das-patinhas/capa.jpg) (2560×1440), [`capa-vertical.jpg`](reino-das-patinhas/capa-vertical.jpg) (1440×2560) e `capa-og.jpg` (prévia de link). Para renderizar de novo: abra `index.html?capa=1` (horizontal) ou `?capa=v` (vertical) e capture a tela.
- **Editar conteúdo/balanceamento:** [`reino-das-patinhas/data.js`](reino-das-patinhas/data.js).

> O jogo orienta, mas não substitui a orientação do médico-veterinário.

## Publicação (GitHub Pages)

O workflow `.github/workflows/pages.yml` publica o site a cada push na `main`.
Ativação única: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Publicação (Netlify)

O `netlify.toml` já configura o build (`_site`) e o atalho `/patinhas`.
No Netlify: **Add new site → Import an existing project → GitHub → Gudagame/cobrinha-game** e escolha o branch. Não precisa preencher comando nem pasta: vêm do `netlify.toml`.
