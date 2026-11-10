# 🐾 REINO DAS PATINHAS: A ÚLTIMA DEFESA
### Documento de Game Design (GDD) — Tower Defense 3D educativo sobre saúde de cães e gatos

> **Jogar:** abra `reino-das-patinhas/index.html` no navegador (precisa de internet só para baixar o Three.js e as fontes).
> **Editar conteúdo:** tudo (torres, inimigos, perguntas, cartões, ondas) está em `reino-das-patinhas/data.js`. As tabelas deste documento foram geradas a partir dele.
> 🩺 *O jogo orienta, mas não substitui a orientação do médico-veterinário.*

---

## 1. Conceito do jogo

O Reino das Patinhas é um mundo mágico onde cães e gatos vivem em harmonia com seus tutores — até que **O Vazio**, entidade feita de negligência, desconhecimento e descuido, envia hordas de criaturas fofas porém perigosas (pulgas, carrapatos, petiscos proibidos, tédio, estresse, mitos…) para apagar o **Santuário da Vida**. O jogador comanda **Dash** (Dachshund estrategista), **Bolt** (Shih Tzu guardião), **Pino** (Pinscher veloz) e **Luna** (gata branca mística), construindo torres inspiradas em cuidados reais — água fresca, alimentação equilibrada, escovação, vacinas, antiparasitários, brinquedos, check-ups — num tower defense 3D low-poly com caminhos ramificados, clima dinâmico, sinergias, escolhas estratégicas e perguntas que viram **bônus, nunca punição**. Cada vitória deixa dicas práticas e Cartões de Cuidado colecionáveis: o jogador sai da partida sabendo proteger melhor o próprio pet.

## 2. Nome, slogan e proposta de valor

| | |
|---|---|
| **Nome** | Reino das Patinhas: A Última Defesa |
| **Slogan** | *“Proteja quem te ama. Aprenda a cuidar jogando.”* |
| **Proposta de valor** | Um tower defense de verdade (estratégico, com chefões e builds) que transforma prevenção veterinária em mecânica de jogo. Cada torre é um hábito real; cada inimigo é um risco real; cada acerto é um bônus. Sem culpa, sem medo, sem pay-to-win. |
| **Público** | Tutores adultos de cães e gatos (25–55), casual-mid core, mobile e web. Secundário: clínicas, ONGs e pet shops que querem educar clientes. |
| **Diferenciais** | (1) Torres = hábitos de cuidado; (2) perguntas como power-ups; (3) escolhas morais sem certo/errado; (4) heróis com combos; (5) colecionável educativo (30 cartões); (6) modo calmo “Clínica do Conhecimento”. |

## 3. Loop principal de gameplay

```
 ┌───────────────────────────── FASE (5–10 min) ─────────────────────────────┐
 │ Preparar ──▶ Construir/Melhorar ──▶ (Evento: ❓ Pergunta | ⚖️ Escolha | 👑 Chefão) │
 │    ▲                                                     │                  │
 │    │                                                     ▼                  │
 │ Recompensa ◀── Onda limpa (+moedas, renda do Relógio) ◀── Onda: torres atiram, │
 │ (moedas, energia,                                         heróis usam poderes,│
 │  baús, cartões)                                           baús surgem no mapa │
 └──────────────────────────────────────────────────────────────────────────┘
          ▼ Fim da fase: ⭐ estrelas · 🐾 Patinhas do Saber · 🃏 cartões · 💡 3 dicas reais
          ▼ Meta-loop: Loja (relíquias) · Cosméticos · Álbum · Diário/Semanal · Ranking
```

- **Micro-loop (segundos):** escolher alvo, usar herói, coletar baú.
- **Loop de onda (30–60 s):** preparar ▶ defender ▶ recompensa. Chamar a onda antes do contador dá bônus (2 💰/segundo restante).
- **Loop de fase (5–10 min):** 10 ondas, 3 perguntas, 2 escolhas, 2–3 baús, chefão final.
- **Meta-loop (dias):** desbloquear mundos e torres, completar o álbum, manter a sequência do Desafio Diário.

## 4. Interface e controles

**HUD (topo):** ❤️ vidas do Santuário · 💰 Moedas de Cuidado · 🌊 onda atual · ⚡ energia dos heróis · ícone do clima (toque para ver o efeito) · velocidade 1x/2x/3x · pausa.
**HUD (base):** 4 botões de heróis (com recarga radial, custo de energia e brilho quando prontos) · 3 itens · botão **▶ Onda N** com prévia dos inimigos (ícones ×quantidade) e ícone do evento seguinte (❓/⚖️/👑).
**Painel inferior (bottom sheet):** ao tocar na grama, aparece a composição da **próxima onda** (🦟 voadores, 🫥 ocultos, 🛡️ blindados…) e a grade de torres com **categoria colorida** (Ataque, Área, Controle, Suporte, Economia), custo, selo 🦟 (acerta voadores) e selo 💡 (**recomendada para a próxima onda**). Tocar uma vez mostra **barras de força** (dano, alcance, velocidade), **“bom contra / limitação / onde colocar”**, alerta se a torre não acerta os voadores que vêm aí e o alcance no mapa; tocar de novo constrói. O botão **📖 Guia de torres** abre a comparação completa com uma “receita” de posicionamento. Ao tocar numa torre: estrelas de nível, estatísticas, prévia do próximo nível, modo de mira, sinergias ativas, lição educativa, Melhorar/Vender/Restaurar.
**Feedback:** números flutuantes, partículas, anéis de alcance, tremor de câmera (desligável), fala dos heróis, toasts e região `aria-live` para leitores de tela.

| Ação | Celular | PC |
|---|---|---|
| Construir / selecionar | Tocar na grama / torre | Clique |
| Girar câmera (limitado ±35°) | Arrastar 1 dedo | Arrastar com botão esquerdo |
| Zoom | Pinça | Roda do mouse |
| Mover câmera | 2 dedos | Botão direito ou Shift+arrastar |
| Heróis | Botões | Teclas 1–4 |
| Chamar onda | Botão ▶ | Espaço/Enter |
| Velocidade / Pausa | Botões | F / P ou Esc |
| Melhorar torre / Itens | Botões | U / Q W E |
| Responder pergunta | Tocar | A–D ou 1–4 |

**Responsivo:** em tela vertical a câmera gira 90° para o mapa ocupar a altura; respeita *safe areas* (notch). **Acessibilidade:** alvos ≥44 px, foco visível, modais com `role=dialog`, textos alternativos, tamanho de texto ajustável, “reduzir movimento”, ícones + texto (não depende só de cor).

## 5. As 12 torres

**Categorias (cores na interface):** 🔴 Ataque (tiro forte em um alvo) · 🟠 Área (vários de uma vez) · 🔵 Controle (deixa lento/prende) · 🟢 Suporte (ajuda outras torres) · 🟡 Economia (gera moedas).
**Receita simples mostrada no Guia:** Controle no começo do caminho → Área nas curvas e junções → Ataque perto do Santuário → pelo menos 2 torres que acertam voadores → Suporte no meio do grupo.

| Torre | Categoria | Dano | Alcance | Velocidade | Acerta voadores? | Bom contra | Limitação | Onde colocar |
|---|---|---|---|---|---|---|---|---|
| 💧 Fonte da Vida | Controle | ●●○○○ | ●●●○○ | ●●●○○ | ✅ | Inimigos rápidos e Calorão (dano x2). Acerta voadores. | Pouco dano contra inimigos com muita vida. | Coloque no começo do caminho: deixa todo mundo lento para as outras torres. |
| 🥣 Tigela Equilibrada | Área | ●●○○○ | ●●●○○ | ●●○○○ | ❌ | Grupos de inimigos juntinhos (pulgas, vermes). | Não acerta voadores. | Ótima onde os dois caminhos se juntam. |
| 🪮 Escova Giratória | Área | ●●●●○ | ●○○○○ | ●●●●● | ❌ | Tudo que passa colado nela; Nózinho leva dano x2. | Alcance bem curto. Não acerta voadores. | Coloque encostada numa curva do caminho. |
| 🫧 Torre Antipulgas | Ataque | ●●○○○ | ●●●○○ | ●●●●○ | ✅ | Parasitas (pulga, carrapato, verme, sarna, lombriga): dano x3. Acerta voadores. | Fraca contra quem não é parasita. | A melhor torre dos mundos 1 e 2. |
| 🧶 Brinquedo Interativo | Controle | ●○○○○ | ●●●○○ | ●●●○○ | ✅ | Faz inimigos andarem para trás e ficarem lentos. Acerta voadores. | Dano baixo: precisa de torres de ataque por perto. | Combine com o Osso Bumerangue (sinergia). |
| 📦 Caixa de Areia | Controle | ●●○○○ | ●●○○○ | ●○○○○ | ❌ | Prende inimigos terrestres no lugar. | Não acerta voadores. | Perto de torres de área: inimigo preso = alvo fácil. |
| ⏰ Relógio da Rotina | Economia | — | ●●○○○ | ●○○○○ | ❌ | Gera moedas no fim de cada onda. | Não causa dano. | Construa cedo: quanto antes, mais rende. |
| 🩺 Torre Veterinária | Suporte | — | ●●○○○ | — | ✅ | Revela inimigos ocultos e cura torres desanimadas. | Não causa dano. | No meio das torres, perto de onde passam ocultos. |
| 🦴 Osso Bumerangue | Área | ●●●○○ | ●●●○○ | ●●○○○ | ❌ | Filas de inimigos em retas longas (atravessa todos). | Não acerta voadores. | Mire ao longo de uma reta do caminho. |
| 💉 Vacina Escudo | Suporte | ●○○○○ | ●●○○○ | ●○○○○ | ❌ | Barreira segura inimigos e tira a armadura deles. | Pouco dano direto. | Perto do Santuário, como última linha de defesa. |
| 💗 Coração do Vínculo | Suporte | — | ●●○○○ | — | ✅ | Torres vizinhas atiram mais rápido e mais longe. | Não causa dano. | Cercada por várias torres de ataque. |
| 🔦 Farol Sentinela | Ataque | ●●●●● | ●●●●● | ●○○○○ | ✅ | Voadores, chefões e ocultos. Ignora noite e neblina. | Atira devagar. | Um ou dois por mapa resolvem muitos problemas. |



Custo de melhoria para o nível N = custo base × (0,7 · 1,0 · 1,4 · 2,0). Dano ×1 → ×1,45 → ×2 → ×2,7 → ×3,6; alcance +0,2/nível; cadência até ×1,45. Vender devolve 70%. Torres têm **Ânimo** (vida): ficam “desanimadas” 😴 se o Tédio/veneno as atingir e se recuperam com Veterinária, Olhar Lunar ou “Restaurar”.

| # | Torre | Custo | Função | Alcance | Dano (Nv1→Nv5) | Cadência | Alvo | Evolução (Nv5) | Lição educativa | Mundo |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 💧 **Fonte da Vida** | 60 | Dano moderado + lentidão | 2.6 → 3.5 | 7 → 25 | 1.25/s | Terrestre + aéreo | Nascente: os disparos deixam poças que deixam todos mais lentos. | Água fresca e limpa todos os dias é essencial. Troque a água pelo menos 1x ao dia e lave o pote. | 1 |
| 2 | 🥣 **Tigela Equilibrada** | 80 | Dano em área leve | 2.5 → 3.4 | 9 → 32 | 0.8/s | Terrestre | Banquete Balanceado: lança 3 croquetes por disparo. | Alimentação completa e na porção certa previne obesidade. Pese ou meça a ração conforme orientação. | 1 |
| 3 | 🪮 **Escova Giratória** | 90 | Dano contínuo em área curta | 1.45 → 2.4 | 11 → 40/s | 1/s | Terrestre | Pente Fino: puxa inimigos para o centro e causa +50% contra Nózinho e Sarninha. | Escovar regularmente evita nós e ajuda a notar caroços, feridas e parasitas cedo. | 1 |
| 4 | 🫧 **Torre Antipulgas** | 85 | Dano triplo contra parasitas | 2.6 → 3.5 | 6 → 22 | 1.6/s | Terrestre + aéreo | Proteção Prolongada: bolhas ricocheteiam para mais 2 parasitas. | Antipulgas e carrapaticidas devem ser usados com regularidade, no produto e dose indicados pelo veterinário. | 1 |
| 5 | 🧶 **Brinquedo Interativo** | 95 | Confunde (faz recuar) e reduz velocidade | 2.7 → 3.6 | 5 → 18 | 1.1/s | Terrestre + aéreo | Quebra-cabeça Supremo: confusão dura o dobro e atinge 2 alvos. | Brinquedos e desafios mentais previnem tédio, ansiedade e comportamentos destrutivos. | 1 |
| 6 | 📦 **Caixa de Areia** | 75 | Armadilhas que prendem inimigos terrestres | 2 → 2.9 | 10 → 36 | 0.45/s | Terrestre | Areia Fofinha: armadilhas atingem em área e prendem até 3 inimigos. | Ambiente adequado reduz estresse: caixa limpa, em local calmo, uma a mais que o número de gatos. | 2 |
| 7 | ⏰ **Relógio da Rotina** | 100 | Gera Moedas de Cuidado a cada onda + pulso de lentidão | 1.8 → 2.7 | +18💰/onda → +86 | 0.25/s | Terrestre | Rotina de Ouro: renda dobrada e pulso que atordoa. | Horários previsíveis de comida, passeio e brincadeira deixam o pet mais seguro e menos estressado. | 2 |
| 8 | 🩺 **Torre Veterinária** | 120 | Cura torres e revela inimigos ocultos | 2.2 → 3.1 | cura 6/s → 13/s | 1/s | Terrestre + aéreo | Check-up Completo: inimigos revelados recebem +35% de dano. | Check-ups preventivos (anuais para adultos, semestrais para idosos) identificam problemas cedo. | 2 |
| 9 | 🦴 **Osso Bumerangue** | 100 | Dano em linha (ida e volta) | 3 → 3.9 | 13 → 47 | 0.6/s | Terrestre | Super Buscar: lança dois ossos em direções diferentes. | Brincadeiras e exercícios diários, adequados à idade e à raça, fortalecem corpo e mente. | 3 |
| 10 | 💉 **Vacina Escudo** | 110 | Ergue barreiras no caminho e quebra armaduras | 2 → 2.9 | 4 → 14/s | 0.2/s | Terrestre | Imunidade de Rebanho: barreiras curam as torres próximas. | Vacinas em dia protegem seu pet e os outros animais. Siga o calendário indicado pelo veterinário. | 3 |
| 11 | 💗 **Coração do Vínculo** | 130 | Aumenta alcance e velocidade das torres vizinhas | 1.6 → 2.5 | buff | 1/s | Terrestre + aéreo | Laço Eterno: torres vizinhas também causam +15% de dano. | Afeto, atenção e interação diária melhoram o bem-estar emocional do animal. | 4 |
| 12 | 🔦 **Farol Sentinela** | 140 | Longo alcance, prioriza voadores e revela ocultos; ignora noite e neblina | 5.2 → 6.1 | 38 → 137 | 0.4/s | Terrestre + aéreo | Olho Atento: disparos críticos (x2) em inimigos com mais vida. | Observar sinais de alerta cedo (apetite, energia, peso, xixi, cocô) faz toda a diferença. | 4 |


### Sinergias (torres vizinhas, até 1,5 casa)

| Sinergia | Torres | Bônus |
|---|---|---|
| **Banho & Escovação** | 💧 Fonte da Vida + 🪮 Escova Giratória | Escova +30% dano e +0.3 alcance. |
| **Refeição Completa** | 💧 Fonte da Vida + 🥣 Tigela Equilibrada | Ambas +15% dano. |
| **Prevenção Total** | 🫧 Torre Antipulgas + 💉 Vacina Escudo | Antipulgas +25% dano; Vacina barreiras +40% vida. |
| **Hora da Brincadeira** | 🧶 Brinquedo Interativo + 🦴 Osso Bumerangue | Ambas +20% cadência. |
| **Diagnóstico Precoce** | 🩺 Torre Veterinária + 🔦 Farol Sentinela | Farol +25% dano; Veterinária +0.5 alcance. |
| **Rotina com Afeto** | 💗 Coração do Vínculo + ⏰ Relógio da Rotina | Relógio gera +50% moedas. |
| **Ambiente Enriquecido** | 📦 Caixa de Areia + 🧶 Brinquedo Interativo | Caixa de Areia prende +50% tempo. |
| **Carteirinha em Dia** | 🩺 Torre Veterinária + 💉 Vacina Escudo | Vacina +30% dano e barreiras +30% vida. |
| **Nutrição & Exercício** | 🥣 Tigela Equilibrada + 🦴 Osso Bumerangue | Ambas +15% dano e +0.2 alcance. |
| **Pente Antiparasitário** | 🫧 Torre Antipulgas + 🪮 Escova Giratória | Escova causa dano triplo em parasitas. |

## 6. Os 20 inimigos

Vida escala por mundo (×1 → ×2,7), por onda (×1,07 por onda) e pela dificuldade adaptativa. Inimigos no caminho ⚠️ dão +50% de moedas.

| # | Inimigo | Vida | Vel. | Comportamento | Dificuldade | Risco real representado |
|---|---|---|---|---|---|---|
| 1 | 🦗 **Pulga Saltitante** | 16 | 1.9 | Rápida, salta e desvia de 20% dos disparos. | ★☆☆☆☆ | Pulgas: coceira, dermatite alérgica e transmissão de vermes (Dipylidium). |
| 2 | 🪲 **Carrapato Blindado** | 70 | 0.7 | Lento e resistente. Dá armadura extra aos vizinhos. | ★★☆☆☆ | Carrapatos transmitem erliquiose e babesiose ("doença do carrapato"). |
| 3 | 🪱 **Verme Escondido** | 26 | 1.1 | Surge de túneis no meio do caminho, invisível até ser revelado. | ★★☆☆☆ | Vermes intestinais muitas vezes não mostram sinais no início. |
| 4 | 🦟 **Mosquito Sombrio** | 22 | 1.5 | Voa: ignora Tigela, Escova, Areia, Osso e Vacina. | ★★☆☆☆ | Mosquitos transmitem dirofilariose (verme do coração) e leishmaniose. |
| 5 | 🍩 **Gordurinha** | 190 | 0.5 | Muito lenta, mas com muita vida. | ★★☆☆☆ | Obesidade: sobrecarga nas articulações, diabetes e menor expectativa de vida. |
| 6 | 🍫 **Petisco Proibido** | 42 | 1 | Ao ser derrotado, solta veneno que desanima torres próximas. | ★★☆☆☆ | Chocolate, uva, cebola, alho e xilitol são tóxicos para pets. |
| 7 | 🌫️ **Sombra do Tédio** | 65 | 0.85 | Desanima (danifica) torres próximas lentamente. | ★★★☆☆ | Tédio leva a ansiedade, latidos excessivos e destruição de objetos. |
| 8 | ⚡ **Estressinho** | 38 | 1.3 | Acelera inimigos próximos em 30%. | ★★★☆☆ | Estresse crônico afeta imunidade, apetite e comportamento. |
| 9 | 📜 **Mito Voador** | 32 | 1.2 | Voa e espalha boatos: torres próximas erram 30% dos disparos. | ★★★☆☆ | Desinformação: receitas caseiras e remédios humanos podem intoxicar. |
| 10 | 👑 **Chefe de Horda** | 420 | 0.55 | Grande, blindado e invoca Pulgas a cada 4s. | ★★★★☆ | Infestação: quando o problema cresce, fica mais difícil de controlar. |
| 11 | 🦷 **Tártaro Teimoso** | 85 | 0.8 | Ganha armadura com o tempo: derrote rápido! | ★★★☆☆ | Tártaro e doença periodontal: mau hálito, dor e infecções. |
| 12 | 🔴 **Sarninha Coceira** | 48 | 1 | Regenera vida continuamente. | ★★☆☆☆ | Sarnas e dermatites: queda de pelo, coceira intensa e feridas. |
| 13 | 🔥 **Calorão** | 58 | 1.25 | Rápido; recebe dano dobrado da Fonte da Vida. | ★★☆☆☆ | Hipertermia: passeios no calor e carros fechados são perigosos. |
| 14 | 🧶 **Nózinho** | 62 | 0.9 | Embolado; recebe dano dobrado da Escova. | ★★☆☆☆ | Nós na pelagem prendem umidade e causam dermatites. |
| 15 | 👂 **Zumbido da Otite** | 50 | 1 | Reduz em 20% a cadência das torres próximas. | ★★★☆☆ | Otite: cabeça sacudindo, coceira e odor nas orelhas. |
| 16 | 🍝 **Lombriga Gulosa** | 110 | 0.75 | Ao ser derrotada, se divide em 3 Vermes Escondidos. | ★★★☆☆ | Vermes intestinais podem passar para pessoas (zoonoses). |
| 17 | 🛋️ **Sofá Sedentário** | 170 | 0.45 | Lento; cura inimigos próximos. | ★★★☆☆ | Sedentarismo: ganho de peso, tédio e perda de massa muscular. |
| 18 | 🗑️ **Lixeira Tentadora** | 70 | 0.95 | Se escapar, rouba 25 Moedas de Cuidado. | ★★★☆☆ | Revirar o lixo: intoxicação, ossos cozidos e corpos estranhos. |
| 19 | 🎆 **Fogos Assustadores** | 30 | 1.75 | Voa rápido; ao estourar, atordoa torres próximas por 1s. | ★★★☆☆ | Fobia de barulhos: fugas e pânico em dias de fogos. |
| 20 | 🫥 **Dor Silenciosa** | 120 | 0.75 | Oculta e blindada: só é atingida quando revelada. | ★★★★☆ | Pets escondem dor: mudanças sutis de comportamento são alertas. |


## 7. Os 5 chefões

#### 1. 🌁 Névoa da Negligência
*“Depois eu vejo isso…” — sussurra a Névoa.* — Vida base 1400, armadura 2.

**Ataques:**
- Bruma Densa: a cada 8s reduz 30% do alcance de todas as torres por 4s.
- Esquecimento: bloqueia melhorias por 4s a cada 12s.
- Neblina Rasteira: invoca 2 Vermes Escondidos a cada 10s.

**Padrão:** Avança devagar, alterna Bruma e Esquecimento. Fica mais rápida abaixo de 40% de vida.

**Fraqueza:** Cura e visão: Olhar Lunar (Luna) ou Visão de Túnel (Dash) dissipam a bruma e deixam o chefão vulnerável (+50% dano) por 6s. Inimigos no alcance de Torres Veterinárias e os disparos do Farol causam +30%.

#### 2. 🌪️ Sombra do Estresse
*“Mais rápido! Mais barulho! Mais tudo!”* — Vida base 2300, armadura 2.

**Ataques:**
- Pânico: a cada 7s acelera todos os inimigos em 50% por 3s.
- Ilusões: cria 3 cópias falsas que atraem disparos.
- Caos: embaralha o modo de mira das torres a cada 15s.

**Padrão:** Ciclo rápido de Pânico → Ilusões → Caos. Na metade da vida, ilusões dobram.

**Fraqueza:** Calma e precisão: enquanto estiver lenta (Fonte, Brinquedo, Relógio) recebe +40% de dano. A Investida de Pino causa dano dobrado.

#### 3. 🌀 Eco da Confusão
*“Ouvi dizer que gato não precisa de veterinário…”* — Vida base 2800, armadura 3.

**Ataques:**
- Clones de Mitos: aos 75%, 50% e 25% de vida cria 3 clones, cada um vulnerável a um único tipo de torre.
- Boato Ensurdecedor: torres próximas erram 30% dos disparos.
- Eco: repete o último inimigo derrotado na entrada.

**Padrão:** Divide-se em clones; cada clone mostra o ícone da torre que o derrota.

**Fraqueza:** Conhecimento: responder corretamente o Desafio do Eco durante a batalha atordoa o chefão por 4s e tira 50% da vida dos clones.

#### 4. ⌛ Devorador do Tempo
*“Amanhã você leva ao veterinário… ou depois de amanhã…”* — Vida base 3600, armadura 4.

**Ataques:**
- Congelar: a cada 9s congela 3 torres por 3s.
- Fome de Moedas: rouba 8 Moedas a cada 5s.
- Atraso: aumenta em 50% o custo das melhorias enquanto vivo.

**Padrão:** Lento e implacável; a cada 25% de vida perdida congela mais torres.

**Fraqueza:** Velocidade: torres com cadência alta (≥1.2/s) causam +30%. Investida Relâmpago de Pino causa x3. Casulo de Bolt deixa torres imunes ao congelamento.

#### 5. 🕳️ O Vazio
*“Sem cuidado… sem atenção… só o Vazio.”* — Vida base 6500, armadura 4.

**Ataques:**
- Fase 1 (100–66%): Bruma Densa + Congelar.
- Fase 2 (66–33%): Pânico + Clones de Mitos.
- Fase 3 (33–0%): todos os ataques, muda o clima para Tempestade e embaralha os caminhos.

**Padrão:** Três fases; entre fases fica invulnerável por 3s e invoca uma horda mista.

**Fraqueza:** Harmonia: usar as 4 habilidades dos heróis em até 15s ativa “Harmonia do Reino”, que tira 15% da vida máxima do Vazio e o atordoa por 5s.



### Heróis e combos

| Herói | Raça | Personalidade | Habilidade | Energia / Recarga | Efeito |
|---|---|---|---|---|---|
| 🌭 **Dash** | Dachshund | Corajoso, baixinho, engraçado e estrategista. | Visão de Túnel | ⚡30 / 20s | Revela todos os inimigos ocultos por 10s (+20% de dano neles) e fareja um caminho secreto com baú. |
| 🧸 **Bolt** | Shih Tzu | Fofo, resistente, leal e um pouco teimoso. | Casulo de Pelagem | ⚡40 / 30s | Por 8s as torres ficam invulneráveis e imunes a congelamento, e o Santuário não perde vidas. |
| ⚡ **Pino** | Pinscher | Ágil, impulsivo, engraçado e competitivo. | Investida Relâmpago | ⚡35 / 18s | Corre pelo caminho causando dano em linha e empurrando os inimigos para trás. |
| 🌙 **Luna** | Gata branca | Elegante, calma, sábia e um pouco sarcástica. | Olhar Lunar | ⚡40 / 28s | Cura todas as torres, remove efeitos de clima por 10s e marca inimigos (+25% de dano) por 8s. |

| Combo | Heróis (janela) | Efeito |
|---|---|---|
| **Escudo Lunar** | Bolt + Luna (4s) | Torres regeneram vida e ganham +15% de cadência por 8s. |
| **Rastro Certeiro** | Dash + Pino (4s) | A Investida de Pino causa dano dobrado em inimigos revelados. |
| **Harmonia do Reino** | Dash + Bolt + Pino + Luna (15s) | Atordoa tudo por 3s e causa 10% da vida máxima a todos (15% no Vazio). |

## 8. As 40 perguntas educativas

Recompensa padrão: **acerto = 💰40 + ⚡20 + Cartão de Cuidado do tema** (×2 em baús; +50% com a relíquia Apostila). **Erro = 💰10** e mensagem de incentivo (“Quase! Agora você sabe — e isso já protege seu pet.”). As alternativas são embaralhadas a cada exibição.

**1. [Alimentos tóxicos] Qual alimento pode ser tóxico para cães?**
A) Maçã sem sementes · B) Chocolate · C) Cenoura cozida · D) Abóbora cozida
✅ **B** — Chocolate contém teobromina, que pode causar intoxicação grave em cães. Se houver ingestão, procure orientação veterinária rapidamente. *(Cartão: Lista Proibida I)*

**2. [Alimentos tóxicos] Uvas e uvas-passas para cães são…**
A) Um petisco saudável · B) Seguras em pequena quantidade · C) Potencialmente tóxicas aos rins · D) Boas para os dentes
✅ **C** — Mesmo pequenas quantidades de uva ou passa podem causar lesão renal em alguns cães. Evite oferecer e procure o veterinário se houver ingestão. *(Cartão: Lista Proibida I)*

**3. [Alimentos tóxicos] Cebola e alho na comida de cães e gatos podem causar…**
A) Anemia · B) Pelos mais brilhantes · C) Mais energia · D) Nada, são temperos naturais
✅ **A** — Cebola e alho (crus, cozidos ou em pó) danificam as células vermelhas do sangue. Evite dar restos de comida temperada. *(Cartão: Lista Proibida II)*

**4. [Alimentos tóxicos] O xilitol, adoçante de chicletes e doces "sem açúcar", em cães pode causar…**
A) Apenas sede · B) Queda brusca de glicose e lesão no fígado · C) Sono tranquilo · D) Nada
✅ **B** — O xilitol é muito perigoso para cães, mesmo em pequenas doses. Guarde chicletes e produtos diet longe do alcance. *(Cartão: Lista Proibida II)*

**5. [Plantas e remédios] Qual planta é extremamente perigosa para gatos?**
A) Capim-gato · B) Lírio · C) Grama de trigo · D) Hortelã
✅ **B** — Todas as partes do lírio, até o pólen e a água do vaso, podem causar insuficiência renal em gatos. Prefira flores seguras para pets. *(Cartão: Casa Segura)*

**6. [Plantas e remédios] Seu gato parece com dor. Pode dar paracetamol?**
A) Sim, meio comprimido · B) Sim, se for infantil · C) Não: é tóxico para gatos; consulte o veterinário · D) Sim, misturado na ração
✅ **C** — Paracetamol pode ser fatal para gatos. Nunca medique pets com remédios humanos sem orientação veterinária. *(Cartão: Casa Segura)*

**7. [Vacinação] Em geral, depois das doses de filhote, um pet adulto precisa de reforço de vacinas…**
A) Nunca mais · B) Conforme o protocolo do veterinário, geralmente anual · C) Só se ficar doente · D) Só quando viajar
✅ **B** — A imunidade das vacinas diminui com o tempo. O veterinário define o calendário ideal para o estilo de vida do seu pet. *(Cartão: Carteirinha em Dia)*

**8. [Vacinação] Por que um filhote recebe várias doses de vacina?**
A) Para dar mais trabalho ao tutor · B) Porque os anticorpos da mãe podem interferir nas primeiras doses · C) Porque a primeira dose sempre falha · D) Não precisa de várias doses
✅ **B** — Os anticorpos maternos vão caindo aos poucos; a série de doses garante proteção na janela certa. Evite locais de risco até completar o esquema. *(Cartão: Carteirinha em Dia)*

**9. [Vermifugação] Com que frequência vermifugar um pet adulto?**
A) Só se aparecer verme nas fezes · B) Periodicamente, conforme orientação veterinária e estilo de vida · C) Uma vez na vida · D) Todo dia
✅ **B** — Muitos vermes não dão sinais visíveis. A frequência depende de idade, ambiente e contato com outros animais — combine com o veterinário. *(Cartão: Vermífugo Programado)*

**10. [Parasitas] Encontrou pulgas no seu pet. O mais eficaz é…**
A) Tratar só o pet · B) Tratar o pet, os outros animais da casa e o ambiente · C) Dar banho todo dia · D) Esperar passar
✅ **B** — A maior parte da população de pulgas (ovos e larvas) fica no ambiente. Trate todos os animais e higienize camas, tapetes e frestas. *(Cartão: Pulgas & Carrapatos)*

**11. [Parasitas] Carrapatos podem transmitir quais doenças aos cães?**
A) Erliquiose e babesiose · B) Gripe e resfriado · C) Diabetes · D) Catapora
✅ **A** — A "doença do carrapato" pode causar febre, apatia e sangramentos. Use carrapaticida regularmente e revise o pelo após passeios. *(Cartão: Pulgas & Carrapatos)*

**12. [Parasitas] Qual doença pode ser transmitida por mosquitos aos cães?**
A) Raiva · B) Dirofilariose (verme do coração) · C) Sarna · D) Otite
✅ **B** — Em regiões de risco, a prevenção da dirofilariose e da leishmaniose inclui repelentes e medicamentos indicados pelo veterinário. *(Cartão: Escudo contra Mosquitos)*

**13. [Peso ideal] Qual é um bom sinal de peso adequado?**
A) Não dá para sentir as costelas · B) Sentir as costelas com leve pressão e ver a cintura de cima · C) Barriga bem redondinha · D) Costelas muito aparentes
✅ **B** — Você deve sentir as costelas sem apertar, e ver uma "cintura" olhando de cima. Na dúvida, o veterinário avalia o escore corporal. *(Cartão: Peso Ideal)*

**14. [Nutrição] Petiscos devem representar no máximo cerca de…**
A) 50% das calorias do dia · B) 10% das calorias do dia · C) Tudo que o pet quiser · D) 80% se forem naturais
✅ **B** — Petiscos em excesso desequilibram a dieta e engordam. Desconte as calorias dos petiscos da porção diária. *(Cartão: Regra dos 10%)*

**15. [Nutrição] Gatos adultos e leite de vaca:**
A) Leite é essencial para gatos · B) Muitos gatos adultos têm intolerância à lactose · C) Leite substitui a água · D) Leite previne cálculos
✅ **B** — Leite de vaca pode causar diarreia em muitos gatos adultos. Água fresca é a melhor bebida. *(Cartão: Regra dos 10%)*

**16. [Nutrição] Um gato (especialmente acima do peso) que para de comer por alguns dias corre risco de…**
A) Nada, é bom para emagrecer · B) Lipidose hepática (fígado gorduroso) · C) Ficar mais ativo · D) Ganhar músculos
✅ **B** — Gatos não podem ficar em jejum prolongado. Falta de apetite por mais de 24–48h merece avaliação veterinária. *(Cartão: Gato Não Faz Jejum)*

**17. [Hidratação] O que costuma estimular os gatos a beber mais água?**
A) Pote ao lado da caixa de areia · B) Fontes com água corrente e vários potes pela casa · C) Água morna com sal · D) Trocar a água uma vez por semana
✅ **B** — Muitos gatos preferem água em movimento e potes longe da comida e da areia. Alimento úmido também ajuda na hidratação. *(Cartão: Água Sempre Fresca)*

**18. [Hidratação] Qual pode ser sinal de desidratação?**
A) Gengiva úmida e rosada · B) Gengiva seca/pegajosa e pele que demora a voltar ao lugar · C) Pelo brilhante · D) Muita energia
✅ **B** — Olhos fundos, gengiva pegajosa e apatia também são sinais. Em caso de suspeita, procure o veterinário. *(Cartão: Água Sempre Fresca)*

**19. [Exercício seguro] Num dia quente, qual o melhor horário para passear com o cão?**
A) Meio-dia · B) Início da manhã ou fim da tarde · C) Logo após uma refeição grande · D) Qualquer hora, o asfalto não esquenta
✅ **B** — Teste o chão com a mão por 7 segundos: se estiver quente para você, está para as patinhas. Leve água no passeio. *(Cartão: Teste dos 7 Segundos)*

**20. [Exercício seguro] Raças de focinho curto (como o Shih Tzu Bolt) no calor…**
A) Aguentam mais calor · B) Têm maior risco de superaquecer e devem evitar esforço intenso · C) Precisam correr mais · D) Não precisam de água
✅ **B** — Cães braquicefálicos respiram com mais dificuldade e perdem calor com menos eficiência. Sombra, água e passeios leves! *(Cartão: Focinho Curto, Calor Curto)*

**21. [Exercício seguro] Para a coluna de um Dachshund (como o Dash), o ideal é…**
A) Incentivar pulos do sofá · B) Usar rampas e evitar saltos e escadas em excesso · C) Carregar pelas patas da frente · D) Exercício só no fim de semana
✅ **B** — Dachshunds têm predisposição a problemas de disco na coluna. Peso adequado e rampas ajudam a proteger. *(Cartão: Coluna Protegida)*

**22. [Enriquecimento] Qual item é um bom enriquecimento ambiental para gatos?**
A) Arranhadores e prateleiras em lugares altos · B) Ficar sempre no mesmo cômodo vazio · C) Luz laser sem nunca deixar "pegar" · D) Nenhum, gatos não precisam
✅ **A** — Gatos gostam de arranhar, escalar e observar do alto. Esconderijos e brincadeiras de caça também reduzem o estresse. *(Cartão: Mundo Vertical)*

**23. [Enriquecimento] Comedouros tipo quebra-cabeça servem para…**
A) Deixar o pet com fome · B) Estimular a mente e deixar a refeição mais lenta e divertida · C) Substituir passeios · D) Apenas decorar
✅ **B** — Brinquedos recheáveis e tapetes de farejar transformam comida em desafio mental e ajudam contra o tédio. *(Cartão: Comer Brincando)*

**24. [Comportamento] Quais comportamentos, quando o cão fica sozinho, podem indicar ansiedade de separação?**
A) Dormir tranquilo · B) Destruição, choro/latidos insistentes e xixi fora do lugar · C) Brincar com um brinquedo · D) Beber água
✅ **B** — Esses sinais pedem ajuda, não bronca. Veterinário e adestrador com reforço positivo podem montar um plano gradual. *(Cartão: Sozinho Sem Sofrer)*

**25. [Comportamento] O pet fez xixi no lugar errado horas atrás. Brigar agora…**
A) Resolve na hora · B) Não ajuda: ele não associa a bronca ao ato e pode ficar com medo · C) Ensina a usar o lugar certo · D) É a única opção
✅ **B** — Recompense quando ele acerta e investigue causas médicas ou de estresse. Reforço positivo cria confiança. *(Cartão: Reforço Positivo)*

**26. [Caixa de areia] Quantas caixas de areia são recomendadas para 2 gatos?**
A) 1 · B) 2 · C) 3 · D) Nenhuma, eles se viram
✅ **C** — A regra prática é uma caixa por gato + uma extra, em locais calmos. Limpe diariamente. *(Cartão: Regra N+1)*

**27. [Emergências] Um gato macho vai várias vezes à caixa e quase não sai xixi. O que fazer?**
A) Esperar até amanhã · B) Procurar atendimento veterinário com urgência · C) Trocar a areia · D) Dar mais ração
✅ **B** — Pode ser obstrução urinária, uma emergência que coloca a vida em risco em poucas horas. *(Cartão: Emergência Não Espera)*

**28. [Dentes] Para escovar os dentes do pet, use…**
A) Pasta de dente humana · B) Pasta específica para pets · C) Bicarbonato puro · D) Sal grosso
✅ **B** — Pastas humanas podem conter flúor e xilitol, perigosos se engolidos. Comece aos poucos e com muito elogio. *(Cartão: Sorriso Saudável)*

**29. [Dentes] Mau hálito persistente no pet pode indicar…**
A) Que ele é feliz · B) Doença periodontal (tártaro e gengivite) · C) Fome · D) Excesso de água
✅ **B** — Tártaro e gengivite causam dor e podem afetar outros órgãos. Escovação e avaliações odontológicas ajudam. *(Cartão: Sorriso Saudável)*

**30. [Unhas] Um sinal de que as unhas do cão estão compridas é…**
A) Ouvir as unhas batendo no chão ao andar · B) Ele dormir muito · C) Pelo caindo · D) Beber mais água
✅ **A** — Unhas longas alteram a pisada e podem quebrar. Corte só a ponta, evitando o vaso sanguíneo (o "sabugo"). *(Cartão: Unhas na Medida)*

**31. [Orelhas] Pet sacudindo muito a cabeça e coçando a orelha com odor forte. Provável…**
A) Alergia a carinho · B) Otite: leve ao veterinário · C) Normal, é mania · D) Falta de banho
✅ **B** — Não use cotonete no fundo do ouvido nem remédios por conta própria. O tratamento depende da causa. *(Cartão: Orelhas Limpas)*

**32. [Sinais de dor] Qual pode ser um sinal de dor em gatos?**
A) Esconder-se mais, cuidar menos do pelo e postura encolhida · B) Ronronar sempre significa estar bem · C) Pular em lugares altos · D) Comer normalmente
✅ **A** — Gatos escondem a dor. Mudanças de hábitos, apetite ou humor merecem atenção e avaliação. *(Cartão: Dor Silenciosa)*

**33. [Vômito e diarreia] Quando vômito ou diarreia exigem veterinário rapidamente?**
A) Nunca · B) Se persistirem, tiverem sangue, ou houver apatia — e logo em filhotes e idosos · C) Só depois de uma semana · D) Só se o pet parar de latir
✅ **B** — Filhotes e idosos desidratam rápido. Não ofereça remédios humanos; leve informações sobre quando começou e frequência. *(Cartão: Vômito & Diarreia)*

**34. [Emergências] Cão grande com barriga inchada, inquieto e tentando vomitar sem conseguir. É…**
A) Gases normais · B) Possível torção gástrica: emergência imediata · C) Fome · D) Preguiça
✅ **B** — A dilatação-torção gástrica pode ser fatal em horas. Vá direto ao atendimento de emergência. *(Cartão: Emergência Não Espera)*

**35. [Filhotes] O período mais importante de socialização do filhote de cão é aproximadamente…**
A) Entre 3 e 14 semanas de vida · B) Depois de 2 anos · C) Só na velhice · D) Não existe
✅ **A** — Apresente pessoas, sons e ambientes com segurança e de forma positiva, respeitando o protocolo de vacinas. *(Cartão: Filhote Bem-Socializado)*

**36. [Idosos] Para pets idosos, o check-up costuma ser recomendado…**
A) A cada 5 anos · B) A cada 6 meses · C) Nunca, já são velhinhos · D) Só em emergências
✅ **B** — Idosos mudam mais rápido; exames frequentes detectam doenças renais, cardíacas e articulares cedo. *(Cartão: Idoso com Carinho)*

**37. [Idosos] Cão idoso desorientado, trocando o dia pela noite e "esquecendo" hábitos. Pode ser…**
A) Teimosia · B) Disfunção cognitiva: converse com o veterinário · C) Falta de bronca · D) Normal e sem solução
✅ **B** — Há manejo, dieta e enriquecimento que melhoram a qualidade de vida. Rotina estável ajuda muito. *(Cartão: Mente Ativa na Velhice)*

**38. [Consultas preventivas] Para um pet adulto saudável, o check-up preventivo deve ser feito pelo menos…**
A) Uma vez por ano · B) Uma vez na vida · C) Só quando adoece · D) A cada 10 anos
✅ **A** — Consultas anuais revisam vacinas, peso, dentes, pele e exames, pegando problemas antes de ficarem graves. *(Cartão: Check-up Anual)*

**39. [Bem-estar] Identificação com plaquinha e microchip servem para…**
A) Enfeitar · B) Aumentar a chance de reencontrar o pet se ele se perder · C) Substituir a vacina · D) Nada
✅ **B** — Mantenha os dados de contato atualizados. Em dias de fogos e viagens, o risco de fuga aumenta. *(Cartão: Sempre Identificado)*

**40. [Vínculo e rotina] Um gato que pisca devagar olhando para você provavelmente está…**
A) Com raiva · B) Relaxado e confiante · C) Com sono profundo · D) Com dor nos olhos
✅ **B** — O "piscar lento" é um sinal de confiança. Experimente piscar devagar de volta! *(Cartão: Piscar Lento)*



## 9. Os 30 Cartões de Cuidado (+1 bônus secreto)

Obtidos ao acertar perguntas do tema, em baús secretos (Visão de Túnel do Dash) e ao vencer fases (2 na primeira vitória, 1 nas seguintes).

| # | Cartão | Categoria | Orientação prática |
|---|---|---|---|
| 1 | 💉 **Carteirinha em Dia** | Prevenção | Guarde a carteira de vacinação e anote as datas dos reforços. Peça ao veterinário um calendário personalizado. |
| 2 | 🪱 **Vermífugo Programado** | Prevenção | Programe lembretes no celular para o vermífugo. A frequência depende do estilo de vida do pet. |
| 3 | 🦗 **Pulgas & Carrapatos** | Prevenção | Antiparasitário regular + revisar o pelo após passeios em grama. Trate também o ambiente. |
| 4 | 🦟 **Escudo contra Mosquitos** | Prevenção | Em áreas de risco, pergunte sobre coleiras repelentes e prevenção de dirofilariose e leishmaniose. |
| 5 | 🩺 **Check-up Anual** | Prevenção | Uma consulta preventiva por ano para adultos (a cada 6 meses para idosos) revisa tudo da cabeça às patinhas. |
| 6 | 🍫 **Lista Proibida I** | Nutrição | Chocolate, café, uva e passa: nunca para cães. Em caso de ingestão, ligue para o veterinário. |
| 7 | 🧅 **Lista Proibida II** | Nutrição | Cebola, alho, xilitol, álcool e massa crua de pão são perigosos. Cuidado com restos de comida temperada. |
| 8 | 🌷 **Casa Segura** | Nutrição | Lírios (para gatos) e remédios humanos como paracetamol e ibuprofeno são tóxicos. Guarde fora do alcance. |
| 9 | ⚖️ **Peso Ideal** | Nutrição | Costelas palpáveis com leve pressão e cintura visível. Pese o pet a cada 1–2 meses. |
| 10 | 🦴 **Regra dos 10%** | Nutrição | Petiscos: no máximo ~10% das calorias diárias. Pedaços de cenoura ou maçã sem sementes são boas opções para cães. |
| 11 | 🐈 **Gato Não Faz Jejum** | Nutrição | Falta de apetite por mais de 24–48h em gatos merece consulta. Mudanças de ração devem ser graduais (7–10 dias). |
| 12 | 💧 **Água Sempre Fresca** | Hidratação | Troque a água ao menos 1x ao dia, lave o pote e espalhe potes pela casa. Fontes ajudam gatos a beber mais. |
| 13 | 🌡️ **Teste dos 7 Segundos** | Exercício | Mão no asfalto por 7 segundos: se queimar você, queima as patinhas. Passeie cedo ou no fim da tarde. |
| 14 | 🥵 **Focinho Curto, Calor Curto** | Exercício | Raças braquicefálicas superaquecem fácil. Sombra, água, ritmo leve e nunca deixar no carro fechado. |
| 15 | 🪜 **Coluna Protegida** | Exercício | Rampas para sofá e cama, peso adequado e evitar pulos: essencial para Dachshunds e cães de coluna longa. |
| 16 | 🐾 **Mundo Vertical** | Enriquecimento | Gatos amam altura: prateleiras, arranhadores firmes e esconderijos reduzem o estresse. |
| 17 | 🧩 **Comer Brincando** | Enriquecimento | Comedouros quebra-cabeça e tapetes de farejar transformam a refeição em exercício mental. |
| 18 | 🚪 **Sozinho Sem Sofrer** | Comportamento | Treine ausências curtas e graduais, saídas sem drama e um brinquedo especial para quando ficar sozinho. |
| 19 | 🏅 **Reforço Positivo** | Comportamento | Recompense o comportamento certo na hora. Bronca depois do fato gera medo, não aprendizado. |
| 20 | 📦 **Regra N+1** | Higiene | Uma caixa de areia por gato + uma extra, longe da comida e em local tranquilo. Limpeza diária. |
| 21 | 🚨 **Emergência Não Espera** | Alerta | Dificuldade para respirar, gengiva pálida/arroxeada, barriga inchada, não conseguir urinar ou convulsão: vá já ao veterinário. |
| 22 | 🪥 **Sorriso Saudável** | Higiene | Escove os dentes com pasta para pets, idealmente todos os dias. Comece devagar e com petiscos. |
| 23 | ✂️ **Unhas na Medida** | Higiene | Corte só a pontinha, evitando o vaso. Se tiver dúvida, peça para o veterinário ensinar. |
| 24 | 👂 **Orelhas Limpas** | Higiene | Limpe só a parte visível com produto indicado. Coceira, odor ou cabeça sacudindo: consulta. |
| 25 | 🫥 **Dor Silenciosa** | Alerta | Esconder-se, mancar, lamber uma região, mudar o humor ou o apetite podem ser sinais de dor. |
| 26 | 🤢 **Vômito & Diarreia** | Alerta | Persistente, com sangue, com apatia, ou em filhote/idoso: procure o veterinário. Não use remédios humanos. |
| 27 | 🍼 **Filhote Bem-Socializado** | Fases da vida | Entre 3 e 14 semanas, apresente o mundo com calma e petiscos: pessoas, sons, superfícies, manuseio. |
| 28 | 👵 **Idoso com Carinho** | Fases da vida | Check-up semestral, camas macias, tapetes antiderrapantes e exercícios leves e regulares. |
| 29 | 🧠 **Mente Ativa na Velhice** | Fases da vida | Rotina estável, jogos de faro e passeios curtos ajudam pets idosos a manter a mente ativa. |
| 30 | 🏷️ **Sempre Identificado** | Vínculo | Plaquinha com telefone + microchip com dados atualizados. Em dias de fogos, mantenha portas e portões fechados. |
| ★ | 😽 **Piscar Lento** | Vínculo (bônus) | O piscar lento é um "eu confio em você" felino. Rotina, carinho respeitoso e brincadeira fortalecem o vínculo. |

## 10. Sistema de itens e melhorias

**Moedas de Cuidado 💰 (dentro da fase):** abates, bônus de onda (22 + 5×onda), Relógio da Rotina, perguntas, chamada antecipada. Gastas em torres e melhorias.

**Patinhas do Saber 🐾 (entre fases):** 10 por estrela + 3 por acerto + 20 na primeira vitória (×1,5 Diário, ×2 Semanal); +1 por acerto na Clínica; +5 por conquista.

**Itens consumíveis (baús, máx. 3 de cada):**

| Item | Efeito |
|---|---|
| 🧰 Kit Primeiros Socorros | Restaura toda a vida das torres e remove congelamentos. |
| 🍖 Ração Energética | +40 de energia para os heróis. |
| 📯 Apito de Reunião | Atordoa todos os inimigos por 2.5s. |

**Relíquias permanentes (Loja do Reino, só com 🐾):**

| Relíquia | Preço | Efeito |
|---|---|---|
| 🦮 Coleira da Coragem | 🐾40 | +5% de dano em todas as torres. |
| 🐷 Cofrinho de Osso | 🐾40 | +40 Moedas de Cuidado no início de cada fase. |
| 🧣 Manta Quentinha | 🐾50 | +3 vidas no Santuário. |
| 📘 Apostila do Tutor | 🐾60 | Perguntas corretas dão +50% de recompensa. |
| 👝 Bolsinha de Petiscos | 🐾70 | Habilidades dos heróis recarregam 15% mais rápido. |
| 🔍 Lupa do Detetive | 🐾80 | Todas as torres revelam ocultos a até 1 casa. |
| 🎒 Mochila de Viagem | 🐾90 | Começa cada fase com 1 Kit e 1 Apito. |
| ⭐ Estrela do Reino | 🐾120 | Venda de torres devolve 85% (em vez de 70%). |

**Cosméticos (só visuais):** 🐾 Clássico · 🦸 Capa de Herói (🐾30) · 🤠 Chapéu de Explorador (🐾30) · 👑 Coroa do Reino (🐾60) · 🌸 Lencinho Florido (🐾25) · 🤓 Óculos de Estudo (🐾40) — para cada um dos 4 heróis, aparecem no modelo 3D.

**Escolhas morais (efeitos na fase):**

| Escolha | Opção A | Opção B |
|---|---|---|
| **Restaurar agora ou guardar para o chefão?** | Restaurar todas as torres (−50 moedas) | Guardar recursos: +25% de dano no chefão |
| **Priorizar cura ou dano?** | Cura: torres regeneram e curas +50% | Dano: todas as torres +15% de dano |
| **Construir mais torres ou melhorar as existentes?** | Próxima torre é gratuita | −40% no custo das próximas 3 melhorias |
| **A trilha perigosa** | Abrir tudo: caminho perigoso dá +100% moedas | Fechar a trilha perigosa por 2 ondas |
| **Prevenção ou economia?** | Investir em prevenção (−70 moedas): próximas 2 ondas com −25% de vida | Guardar as moedas (+30 agora) |
| **Treino dos heróis** | Treino: recargas −25% até o fim da fase | Descanso: +50 de energia agora |
| **Rotina ou recompensa imediata?** | Rotina: +1 vida a cada onda sem vazamentos | Recompensa: +60 moedas agora |

## 11. Estrutura de uma fase de 10 minutos

| Tempo | Momento | O que acontece | Emoção |
|---|---|---|---|
| 0:00–0:45 | Abertura | História do mundo, clima, caminho ⚠️, heróis. Primeira construção | Curiosidade |
| 0:45–2:00 | Ondas 1–2 | Inimigos básicos, ensina o tipo novo do mundo; 1º baú | Domínio |
| 2:00–2:20 | ❓ Pergunta 1 | Bônus de moedas/energia + cartão | Recompensa |
| 2:20–4:00 | Ondas 3–4 | Ocultos via túnel (pede Dash), voadores (pede torres “ambos”) | Desafio |
| 4:00–4:20 | ⚖️ Escolha 1 | Ex.: construir × melhorar | Agência |
| 4:20–6:00 | Ondas 5–6 | Tanques + suporte inimigo; ❓ Pergunta 2; 2º baú | Tensão |
| 6:00–6:20 | Respiro | Onda mais leve, tempo de evoluir torres e montar sinergias | Alívio |
| 6:20–7:30 | Ondas 7–8 | Pico de dificuldade; ⚖️ Escolha 2; 3º baú | Pressão |
| 7:30–8:30 | Onda 9 | Mini-chefe (Chefe de Horda); ❓ Pergunta 3 | Clímax 1 |
| 8:30–10:00 | Onda 10 | 👑 Apresentação do chefão (ataques + fraqueza) e batalha | Clímax 2 |
| 10:00 | Resultado | ⭐, 🐾, cartões, 3 dicas reais, aviso veterinário | Orgulho/aprendizado |

## 12. Tutorial jogável e roteiro da Fase 1

### 12.1 Tutorial — “Jardim do Treino” (3–5 min)

Partida curta e guiada, oferecida na primeira vez que o jogador abre a Campanha (e sempre disponível no menu). Uma caixa com o herói da vez explica cada passo, mostra o progresso (Passo N/12) e só avança quando o jogador **faz** a ação. Um quadrado amarelo com seta marca onde tocar e os botões relevantes pulsam. Não há contagem automática entre ondas no tutorial.

| Passo | Herói | O que ensina | Avança quando |
|---|---|---|---|
| 1. Bem-vindo ao Reino | Dash | Apresenta o portal, o caminho, o Santuário e os heróis nos pedestais (que pulam) | Botão “Vamos lá!” |
| 2. Sua primeira torre | Dash | Construir a 💧 Fonte da Vida no quadrado marcado | Fonte construída |
| 3. Chame a onda | Bolt | ▶ Onda 1 (4 pulgas); moedas por abate | Onda limpa |
| 4. Cada torre tem uma função | Luna | Categorias, barras, selo 💡, Guia; construir a 🪮 Escova colada na Fonte | Escova construída |
| 5. Sinergia e melhoria | Pino | Linha rosa 🔗 “Banho & Escovação”; ⬆️ Melhorar uma torre | Torre nível 2 |
| 6. Visão de Túnel | Dash | Vermes ocultos saem dos buracos; usar Dash (tecla 1) — dica “Agora!” quando surgem | Dash usado + onda limpa |
| 7. Inimigos voadores | Luna | Mosquitos; selo 🦟; construir 🫧 Antipulgas | Onda 3 limpa |
| 8. Investida Relâmpago | Pino | Gordurinhas; usar Pino (tecla 3) | Pino usado + onda limpa |
| 9. Casulo + Olhar Lunar | Luna | Sombra do Tédio desanima torres; Bolt + Luna = combo Escudo Lunar | Bolt e Luna usados + onda limpa |
| 10. Baús e perguntas | Dash | Baú surge marcado; pergunta educativa; item e cartão | Baú aberto |
| 11. Escolhas estratégicas | Bolt | Escolha “Construir × Melhorar” | Opção escolhida |
| 12. Último teste: chefão! | Luna | Chefe de Horda; velocidade, itens e Harmonia do Reino | Vitória |

Ao vencer: +30 🐾, 1 Cartão de Cuidado e o botão **“Começar a Campanha ▶”**.

### 12.2 Fase 1 — Campina dos Filhotes

**Mapa:** 18×11 casas, céu limpo. Portal à esquerda; o caminho se divide em **Trilha Norte** (longa, segura) e **Trilha Sul ⚠️** (curta, +50% moedas). Dois túneis por onde surgem Vermes Escondidos. Santuário à direita, com os 4 heróis. **Recursos:** 230 💰, 20 ❤️, 50 ⚡. **Torres:** Fonte da Vida, Tigela, Escova, Antipulgas, Brinquedo.

| Onda | Inimigos | Evento | Roteiro / falas | Ensina |
|---|---|---|---|---|
| — | — | Abertura | *Dash:* “Toque em um quadradinho de grama para construir sua primeira torre!” | Construir |
| 1 | 6 Pulgas | — | *Bolt:* “Ótimo! Toque em ▶ Iniciar Onda quando estiver pronto.” (botão pulsa) | Iniciar onda, mira |
| 2 | 8 Pulgas, 1 Carrapato | 🎁 Baú | Carrapato blindado ensina que dano baixo e rápido perde para armadura | Armadura, baús |
| 3 | 6 Pulgas, 4 Vermes | ❓ Pergunta | *Dash:* “Vermes escondidos saindo dos túneis! Use minha Visão de Túnel (tecla 1)!” | Ocultos, heróis |
| 4 | 5 Mosquitos, 6 Pulgas | 🎁 Baú | Mosquitos voam: só Fonte, Antipulgas e Brinquedo os acertam. *Luna:* “Toque numa torre para melhorá-la. Fonte + Escova = Banho & Escovação!” | Voadores, melhorias |
| 5 | 2 Gordurinhas, 3 Carrapatos, 8 Pulgas | ⚖️ Construir × melhorar | Mercador oferece torre grátis ou −40% em 3 melhorias | Sinergia, economia |
| 6 | 6 Vermes, 6 Mosquitos | ❓ Pergunta | Mistura oculto + voador | Combinar defesas |
| 7 | 4 Petiscos Proibidos, 3 Gordurinhas, 10 Pulgas | 🎁 Baú | Petisco solta veneno: espalhe torres | Posicionamento |
| 8 | 5 Carrapatos, 8 Mosquitos, 6 Vermes | ⚖️ Restaurar × guardar | Pico de dificuldade | Gestão de recursos |
| 9 | Chefe de Horda, 12 Pulgas, 3 Gordurinhas | ❓ Pergunta | Chefe invoca pulgas: “infestação cresce se não tratada” | Prioridade de alvo |
| 10 | **Névoa da Negligência** + escolta | 👑 Apresentação | *Névoa:* “Depois eu vejo isso…” — Fraqueza: Luna/Dash dissipam a bruma (+50% dano) | Chefão, combos |

**Fim:** 3 dicas (uma ligada a um inimigo da fase, duas gerais), cartões desbloqueados, desbloqueio do Mundo 2 (Caixa de Areia, Relógio da Rotina, Veterinária).

### Os 5 mundos

| Mundo | Clima | Chefão | Foco educativo | Torres novas | Moedas iniciais |
|---|---|---|---|---|---|
| 1. **Campina dos Filhotes** | ☀️ Céu Limpo | 🌁 Névoa da Negligência | A Névoa da Negligência cobriu a Campina! Filhotes precisam de vacinas, vermífugo e muito carinho. Dash, Bolt, Pino e Luna contam com você! | 💧 Fonte da Vida, 🥣 Tigela Equilibrada, 🪮 Escova Giratória, 🫧 Torre Antipulgas, 🧶 Brinquedo Interativo | 230 |
| 2. **Bosque das Coceirinhas** | 🌧️ Chuva | 🌪️ Sombra do Estresse | A chuva trouxe coceira ao Bosque! Escovação, controle de parasitas e rotina vão acalmar a Sombra do Estresse. | 📦 Caixa de Areia, ⏰ Relógio da Rotina, 🩺 Torre Veterinária | 260 |
| 3. **Pântano do Eco** | 🌫️ Neblina | 🌀 Eco da Confusão | No Pântano, mitos ecoam por todo lado! Só o conhecimento verdadeiro dissipa a neblina do Eco da Confusão. | 🦴 Osso Bumerangue, 💉 Vacina Escudo | 290 |
| 4. **Cidade das Pressas** | 🌙 Noite | ⌛ Devorador do Tempo | Na Cidade das Pressas ninguém tem tempo para nada! O Devorador do Tempo quer adiar todos os cuidados. Vamos mostrar que prevenção não espera. | 💗 Coração do Vínculo, 🔦 Farol Sentinela | 320 |
| 5. **Abismo do Vazio** | ⛈️ Tempestade, 🌙 Noite, 🌫️ Neblina, 🌧️ Chuva | 🕳️ O Vazio | O Abismo muda de clima a cada onda. É a última defesa: tudo o que você aprendeu será testado contra O Vazio! |  | 360 |

## 13. Direção de arte e áudio

**Estilo:** low-poly “brinquedo” — geometrias simples (8–12 lados), *flat shading*, silhuetas legíveis de longe, olhos grandes e brilhantes em todos os inimigos (fofos, nunca grotescos). Torres com base de pedra creme + topo colorido que identifica a função; pinos dourados mostram o nível; coroa dourada no nível 5.

**Paleta base:** Tinta `#2B2140` · Creme `#FFF8EE` · Laranja `#FF8A3D` · Rosa `#FF5C8A` · Turquesa `#2EC4B6` · Roxo `#7B5CFF` · Amarelo `#FFD23F`.
**Paleta por mundo:** Campina (verdes `#7CCF6A`, céu `#BFE8FF`) · Bosque (verde-água `#4FAE8C`, chuva) · Pântano (oliva `#6F8F6A`, lilás) · Cidade (azul-ardósia `#5D6D8A`, janelas amarelas) · Abismo (violeta `#4A3F6B`, cristais).

**Cenários com identidade própria (mesmas rotas, visuais bem diferentes):**

| Mundo | Tabuleiro | Caminho | Entorno | Animação ambiente |
|---|---|---|---|---|
| Campina | Grama xadrez clara | Terra com pedrinhas | Cerca branca, árvores, flores, lagoa | Nuvens passando |
| Bosque | Musgo irregular | Terra escura com pedras | Floresta densa de pinheiros, troncos, cogumelos | Vaga-lumes, chuva |
| Pântano | Ilhotas hexagonais sobre lama | Passarela de madeira com estacas | Lago, vitórias-régias, árvores secas, juncos | Água ondulando, folhas boiando, neblina |
| Cidade | Calçadas cinza em placas | Asfalto com faixa amarela tracejada | Prédios com janelas acesas, postes, carros | Noite urbana |
| Abismo | Plataforma flutuante escura | Trilha roxa luminosa | Estrelas, rochas flutuantes com cristais, obeliscos | Rochas flutuando, trilha pulsando, tempestade |

**Heróis em destaque:** os 4 heróis ficam em **pedestais** ao lado do Santuário, em tamanho maior, com **plaquinha de nome** colorida e anel luminoso que **pisca quando o poder está pronto** (e esmaece na recarga).

**Animações:** torres “brotam” com *squash & stretch*; escova gira; farol pulsa; inimigos balançam ao andar, pulgas saltam, mosquitos batem asas; heróis abanam o rabo e pulam ao usar poderes; Pino corre pelo caminho na Investida; chefões têm aura girando. Câmera treme (trauma²) em vazamentos e chefões.

**Iluminação:** luz hemisférica + sol direcional com sombras suaves; noite com luz azulada e janelas/lâmpadas emissivas; neblina real (*fog*); relâmpagos na tempestade; cristal do Santuário brilha conforme as vidas.

**Trilha sonora:** loop pentatônico alegre (triângulo + baixo senoidal), tônica muda por mundo (Dó, Ré, Si, Lá, Sol). Sugestão para versão final: ukulele + xilofone + assobio; camadas adaptativas (percussão entra na onda, cordas no chefão).

**Efeitos sonoros (sintetizados em Web Audio):** “plim” de disparo, gota d’água, “pop” de bolha, moedas em duas notas, fanfarra de onda, arpejo de acerto, duas notas suaves (sem buzina!) no erro, rugido grave do chefão, trovão, cristal de congelamento.

## 14. Dificuldade adaptativa

| Sinal observado | Ajuste |
|---|---|
| Vazamentos na onda | Vida dos próximos inimigos −3,5% por vida perdida (até −10,5%/onda) + dica da Luna |
| Onda perfeita com vidas cheias e >250 💰 | +3% de vida nos inimigos |
| Onda limpa normal | +1,2% |
| Derrota | Próxima tentativa começa 10% mais fácil |
| Vitória com 3 ⭐ | Próxima fase +3% |

Limites: 0,75× a 1,25×. O fator fica salvo no perfil. Modos fixos: **Relaxada** (0,8×) e **Desafiadora** (1,25×). Ferramentas complementares: chamar onda cedo (bônus para experts), velocidade 3x, escolhas “seguras” (fechar trilha perigosa), relíquias.

## 15. Monetização ética (sem pay-to-win)

1. **Jogo completo gratuito** — campanha, modos e álbum sem paredes de pagamento.
2. **Relíquias e poder só com 🐾 Patinhas do Saber** (ganhas jogando/aprendendo). Nunca vendidas por dinheiro.
3. **Opcional pago (futuro):** pacotes cosméticos (roupinhas, temas de torres, skins de Santuário), “Apoiador do Reino” (cosmético exclusivo + nome nos créditos).
4. **Doação solidária:** parte da receita de cosméticos para ONGs de adoção/castração, com relatório público.
5. **B2B / patrocínio responsável:** versões white-label para clínicas e prefeituras (campanhas de vacinação e castração), conteúdo revisado por médicos-veterinários; sem promover marcas de medicamentos dentro das perguntas.
6. **Proibido:** loot boxes pagas, energia/vidas pagas, anúncios intrusivos durante ondas, pressão por FOMO agressivo, coleta de dados além do necessário (o MVP salva tudo localmente).

## 16. MVP para validar rapidamente

**Hipóteses:** (H1) tutores jogam até o fim da Fase 1 (meta ≥60%); (H2) aprendem algo (meta: +25 p.p. de acerto entre pré e pós-teste de 5 perguntas); (H3) voltam no dia seguinte pelo Desafio Diário (meta D1 ≥25%); (H4) perguntas são vistas como bônus (NPS da pergunta ≥ 8).

**Escopo do MVP (já implementado neste repositório):** Mundo 1 completo com tutorial + 4 mundos extras, 12 torres, 20 inimigos, 5 chefões, 4 heróis com combos, 40 perguntas, 30 cartões, Diário/Semanal/Clínica, salvamento local.

**Plano de 2 semanas:**
1. Dias 1–3: teste com 10–15 tutores (moderado, *think-aloud*) só na Fase 1; medir onde travam.
2. Dias 4–7: publicar no itch.io/GitHub Pages; link em grupos de tutores e numa clínica parceira; pré/pós-teste em formulário.
3. Dias 8–10: revisar perguntas com 2 médicos-veterinários; ajustar balanceamento via `data.js`.
4. Dias 11–14: medir D1/D3, % que completa a Fase 1, taxa de acerto por tema → decidir próximos mundos e app nativo (Capacitor/PWA).

**Métricas instrumentáveis depois:** início/fim de fase, vidas restantes, acertos por pergunta, uso de cada herói/torre, abandono por onda.

---
*Implementação: HTML + CSS + JavaScript (módulo ES) com Three.js r186 via import map, sem build. Desenvolvido com apoio das skills `tower-defense`, `threejs-scene-setup`, `threejs-materials-lighting`, `game-feel` e `game-ui-ux` do pacote awesome-gamedev-agent-skills.*
