/* =====================================================================
   REINO DAS PATINHAS: A ÚLTIMA DEFESA — DADOS DO JOGO
   ---------------------------------------------------------------------
   Este arquivo contém TODO o conteúdo editável do jogo: torres, inimigos,
   chefões, perguntas, cartões, mundos, ondas, escolhas morais, itens,
   conquistas e cosméticos. Altere os números aqui para balancear o jogo
   sem mexer no motor (index.html).

   Script clássico (não-módulo) para funcionar até abrindo o arquivo
   direto do disco (file://).
   ===================================================================== */
window.GAME_DATA = (function () {
  'use strict';

  /* ---------------------------------------------------------------
     TORRES (12)
     type: projectile | splash | aura | shield | trap | boomerang |
           heal | buff | sniper | econ
     targets: ground | air | both
     base: valores do nível 1. Os níveis 2–5 escalam por LEVEL_SCALE.
     lvl5: evolução especial liberada no nível 5.
     unlockWorld: mundo da campanha em que a torre aparece.
     --------------------------------------------------------------- */
  const towers = [
    {
      id: 'agua', name: 'Fonte da Vida', icon: '💧', hero: 'luna', color: 0x49b6ff,
      type: 'projectile', targets: 'both', cost: 60, unlockWorld: 1,
      base: { dmg: 7, range: 2.6, rate: 1.25, slow: 0.3, slowTime: 1.4 },
      role: 'Dano moderado + lentidão',
      lvl5: 'Nascente: os disparos deixam poças que deixam todos mais lentos.',
      lesson: 'Água fresca e limpa todos os dias é essencial. Troque a água pelo menos 1x ao dia e lave o pote.'
    },
    {
      id: 'tigela', name: 'Tigela Equilibrada', icon: '🥣', hero: 'bolt', color: 0xffb347,
      type: 'splash', targets: 'ground', cost: 80, unlockWorld: 1,
      base: { dmg: 9, range: 2.5, rate: 0.8, splash: 1.0 },
      role: 'Dano em área leve',
      lvl5: 'Banquete Balanceado: lança 3 croquetes por disparo.',
      lesson: 'Alimentação completa e na porção certa previne obesidade. Pese ou meça a ração conforme orientação.'
    },
    {
      id: 'escova', name: 'Escova Giratória', icon: '🪮', hero: 'bolt', color: 0xd88cff,
      type: 'aura', targets: 'ground', cost: 90, unlockWorld: 1,
      base: { dmg: 11, range: 1.45, rate: 1 },
      role: 'Dano contínuo em área curta',
      lvl5: 'Pente Fino: puxa inimigos para o centro e causa +50% contra Nózinho e Sarninha.',
      lesson: 'Escovar regularmente evita nós e ajuda a notar caroços, feridas e parasitas cedo.'
    },
    {
      id: 'antipulgas', name: 'Torre Antipulgas', icon: '🫧', hero: 'pino', color: 0x6ee7a8,
      type: 'projectile', targets: 'both', cost: 85, unlockWorld: 1,
      base: { dmg: 6, range: 2.6, rate: 1.6, parasiteMult: 3 },
      role: 'Dano triplo contra parasitas',
      lvl5: 'Proteção Prolongada: bolhas ricocheteiam para mais 2 parasitas.',
      lesson: 'Antipulgas e carrapaticidas devem ser usados com regularidade, no produto e dose indicados pelo veterinário.'
    },
    {
      id: 'brinquedo', name: 'Brinquedo Interativo', icon: '🧶', hero: 'pino', color: 0xff7aa8,
      type: 'projectile', targets: 'both', cost: 95, unlockWorld: 1,
      base: { dmg: 5, range: 2.7, rate: 1.1, confuse: 0.25, slow: 0.2, slowTime: 1.0 },
      role: 'Confunde (faz recuar) e reduz velocidade',
      lvl5: 'Quebra-cabeça Supremo: confusão dura o dobro e atinge 2 alvos.',
      lesson: 'Brinquedos e desafios mentais previnem tédio, ansiedade e comportamentos destrutivos.'
    },
    {
      id: 'areia', name: 'Caixa de Areia', icon: '📦', hero: 'dash', color: 0xf3d58b,
      type: 'trap', targets: 'ground', cost: 75, unlockWorld: 2,
      base: { dmg: 10, range: 2.0, rate: 0.45, stun: 1.2, maxTraps: 3 },
      role: 'Armadilhas que prendem inimigos terrestres',
      lvl5: 'Areia Fofinha: armadilhas atingem em área e prendem até 3 inimigos.',
      lesson: 'Ambiente adequado reduz estresse: caixa limpa, em local calmo, uma a mais que o número de gatos.'
    },
    {
      id: 'relogio', name: 'Relógio da Rotina', icon: '⏰', hero: 'dash', color: 0xa0c4ff,
      type: 'econ', targets: 'ground', cost: 100, unlockWorld: 2,
      base: { dmg: 0, range: 1.8, rate: 0.25, income: 18, slow: 0.25, slowTime: 1.5 },
      role: 'Gera Moedas de Cuidado a cada onda + pulso de lentidão',
      lvl5: 'Rotina de Ouro: renda dobrada e pulso que atordoa.',
      lesson: 'Horários previsíveis de comida, passeio e brincadeira deixam o pet mais seguro e menos estressado.'
    },
    {
      id: 'vet', name: 'Torre Veterinária', icon: '🩺', hero: 'luna', color: 0xffffff,
      type: 'heal', targets: 'both', cost: 120, unlockWorld: 2,
      base: { dmg: 0, range: 2.2, rate: 1, heal: 6, reveal: true, markBonus: 0.15 },
      role: 'Cura torres e revela inimigos ocultos',
      lvl5: 'Check-up Completo: inimigos revelados recebem +35% de dano.',
      lesson: 'Check-ups preventivos (anuais para adultos, semestrais para idosos) identificam problemas cedo.'
    },
    {
      id: 'osso', name: 'Osso Bumerangue', icon: '🦴', hero: 'dash', color: 0xfff1d6,
      type: 'boomerang', targets: 'ground', cost: 100, unlockWorld: 3,
      base: { dmg: 13, range: 3.0, rate: 0.6, pierce: 99 },
      role: 'Dano em linha (ida e volta)',
      lvl5: 'Super Buscar: lança dois ossos em direções diferentes.',
      lesson: 'Brincadeiras e exercícios diários, adequados à idade e à raça, fortalecem corpo e mente.'
    },
    {
      id: 'vacina', name: 'Vacina Escudo', icon: '💉', hero: 'bolt', color: 0x7fd1ff,
      type: 'shield', targets: 'ground', cost: 110, unlockWorld: 3,
      base: { dmg: 4, range: 2.0, rate: 0.2, barrierHp: 120, armorBreak: 3 },
      role: 'Ergue barreiras no caminho e quebra armaduras',
      lvl5: 'Imunidade de Rebanho: barreiras curam as torres próximas.',
      lesson: 'Vacinas em dia protegem seu pet e os outros animais. Siga o calendário indicado pelo veterinário.'
    },
    {
      id: 'coracao', name: 'Coração do Vínculo', icon: '💗', hero: 'luna', color: 0xff5c8a,
      type: 'buff', targets: 'both', cost: 130, unlockWorld: 4,
      base: { dmg: 0, range: 1.6, rate: 1, buffRate: 0.15, buffRange: 0.12 },
      role: 'Aumenta alcance e velocidade das torres vizinhas',
      lvl5: 'Laço Eterno: torres vizinhas também causam +15% de dano.',
      lesson: 'Afeto, atenção e interação diária melhoram o bem-estar emocional do animal.'
    },
    {
      id: 'farol', name: 'Farol Sentinela', icon: '🔦', hero: 'luna', color: 0xfff27a,
      type: 'sniper', targets: 'both', cost: 140, unlockWorld: 4,
      base: { dmg: 38, range: 5.2, rate: 0.4, reveal: true },
      role: 'Longo alcance, prioriza voadores e revela ocultos; ignora noite e neblina',
      lvl5: 'Olho Atento: disparos críticos (x2) em inimigos com mais vida.',
      lesson: 'Observar sinais de alerta cedo (apetite, energia, peso, xixi, cocô) faz toda a diferença.'
    }
  ];

  // Multiplicadores por nível (índice 0 = nível 1)
  const LEVEL_SCALE = {
    dmg:   [1, 1.45, 2.0, 2.7, 3.6],
    range: [0, 0.2, 0.4, 0.6, 0.9],
    rate:  [1, 1.1, 1.2, 1.32, 1.45],
    cost:  [0, 0.7, 1.0, 1.4, 2.0],  // custo da melhoria PARA este nível (x custo base)
    hp:    [100, 125, 150, 180, 220]
  };

  /* ---------------------------------------------------------------
     INIMIGOS (20)
     speed em casas/seg. armor = redução fixa de dano por golpe.
     tags: parasite | flying | hidden | armored | swarm | boss
     --------------------------------------------------------------- */
  const enemies = {
    pulga:      { name: 'Pulga Saltitante', icon: '🦗', hp: 16, speed: 1.9, bounty: 3, color: 0x8b5a2b, size: 0.22, tags: ['parasite','swarm'], evade: 0.2, shape: 'bug', diff: 1,
                  behavior: 'Rápida, salta e desvia de 20% dos disparos.', risk: 'Pulgas: coceira, dermatite alérgica e transmissão de vermes (Dipylidium).' },
    carrapato:  { name: 'Carrapato Blindado', icon: '🪲', hp: 70, speed: 0.7, bounty: 7, color: 0x6b3d2e, size: 0.32, tags: ['parasite','armored'], armor: 3, armorAura: 2, shape: 'bug', diff: 2,
                  behavior: 'Lento e resistente. Dá armadura extra aos vizinhos.', risk: 'Carrapatos transmitem erliquiose e babesiose ("doença do carrapato").' },
    verme:      { name: 'Verme Escondido', icon: '🪱', hp: 26, speed: 1.1, bounty: 4, color: 0xe58fa0, size: 0.24, tags: ['parasite','hidden','swarm'], tunnel: true, shape: 'worm', diff: 2,
                  behavior: 'Surge de túneis no meio do caminho, invisível até ser revelado.', risk: 'Vermes intestinais muitas vezes não mostram sinais no início.' },
    mosquito:   { name: 'Mosquito Sombrio', icon: '🦟', hp: 22, speed: 1.5, bounty: 4, color: 0x3d3d5c, size: 0.22, tags: ['flying'], shape: 'fly', diff: 2,
                  behavior: 'Voa: ignora Tigela, Escova, Areia, Osso e Vacina.', risk: 'Mosquitos transmitem dirofilariose (verme do coração) e leishmaniose.' },
    gordurinha: { name: 'Gordurinha', icon: '🍩', hp: 190, speed: 0.5, bounty: 10, color: 0xffc06b, size: 0.42, tags: [], shape: 'blob', diff: 2,
                  behavior: 'Muito lenta, mas com muita vida.', risk: 'Obesidade: sobrecarga nas articulações, diabetes e menor expectativa de vida.' },
    petisco:    { name: 'Petisco Proibido', icon: '🍫', hp: 42, speed: 1.0, bounty: 6, color: 0x5a3220, size: 0.3, tags: [], poison: 18, shape: 'box', diff: 2,
                  behavior: 'Ao ser derrotado, solta veneno que desanima torres próximas.', risk: 'Chocolate, uva, cebola, alho e xilitol são tóxicos para pets.' },
    tedio:      { name: 'Sombra do Tédio', icon: '🌫️', hp: 65, speed: 0.85, bounty: 7, color: 0x7d7aa8, size: 0.34, tags: [], towerDps: 5, shape: 'ghost', diff: 3,
                  behavior: 'Desanima (danifica) torres próximas lentamente.', risk: 'Tédio leva a ansiedade, latidos excessivos e destruição de objetos.' },
    estressinho:{ name: 'Estressinho', icon: '⚡', hp: 38, speed: 1.3, bounty: 5, color: 0xff5252, size: 0.27, tags: [], speedAura: 0.3, shape: 'spiky', diff: 3,
                  behavior: 'Acelera inimigos próximos em 30%.', risk: 'Estresse crônico afeta imunidade, apetite e comportamento.' },
    mito:       { name: 'Mito Voador', icon: '📜', hp: 32, speed: 1.2, bounty: 6, color: 0xc9b2ff, size: 0.28, tags: ['flying'], missAura: 0.3, shape: 'fly', diff: 3,
                  behavior: 'Voa e espalha boatos: torres próximas erram 30% dos disparos.', risk: 'Desinformação: receitas caseiras e remédios humanos podem intoxicar.' },
    chefeHorda: { name: 'Chefe de Horda', icon: '👑', hp: 420, speed: 0.55, bounty: 30, color: 0x9c2f4f, size: 0.55, tags: ['armored'], armor: 3, summon: 'pulga', summonEvery: 4, shape: 'spiky', diff: 4,
                  behavior: 'Grande, blindado e invoca Pulgas a cada 4s.', risk: 'Infestação: quando o problema cresce, fica mais difícil de controlar.' },
    tartaro:    { name: 'Tártaro Teimoso', icon: '🦷', hp: 85, speed: 0.8, bounty: 7, color: 0xe8e0b0, size: 0.32, tags: ['armored'], armor: 1, armorGrow: 0.5, shape: 'box', diff: 3,
                  behavior: 'Ganha armadura com o tempo: derrote rápido!', risk: 'Tártaro e doença periodontal: mau hálito, dor e infecções.' },
    sarninha:   { name: 'Sarninha Coceira', icon: '🔴', hp: 48, speed: 1.0, bounty: 6, color: 0xff8f6b, size: 0.28, tags: ['parasite'], regen: 3, shape: 'spiky', diff: 2,
                  behavior: 'Regenera vida continuamente.', risk: 'Sarnas e dermatites: queda de pelo, coceira intensa e feridas.' },
    calorao:    { name: 'Calorão', icon: '🔥', hp: 58, speed: 1.25, bounty: 6, color: 0xff7b00, size: 0.3, tags: [], weakTo: 'agua', shape: 'blob', diff: 2,
                  behavior: 'Rápido; recebe dano dobrado da Fonte da Vida.', risk: 'Hipertermia: passeios no calor e carros fechados são perigosos.' },
    nozinho:    { name: 'Nózinho', icon: '🧶', hp: 62, speed: 0.9, bounty: 6, color: 0xbfa58a, size: 0.32, tags: [], armor: 1, weakTo: 'escova', shape: 'blob', diff: 2,
                  behavior: 'Embolado; recebe dano dobrado da Escova.', risk: 'Nós na pelagem prendem umidade e causam dermatites.' },
    zumbido:    { name: 'Zumbido da Otite', icon: '👂', hp: 50, speed: 1.0, bounty: 6, color: 0xd4a017, size: 0.28, tags: [], rateAura: 0.2, shape: 'spiky', diff: 3,
                  behavior: 'Reduz em 20% a cadência das torres próximas.', risk: 'Otite: cabeça sacudindo, coceira e odor nas orelhas.' },
    lombriga:   { name: 'Lombriga Gulosa', icon: '🍝', hp: 110, speed: 0.75, bounty: 9, color: 0xf2b8c6, size: 0.36, tags: ['parasite'], splitInto: 'verme', splitCount: 3, shape: 'worm', diff: 3,
                  behavior: 'Ao ser derrotada, se divide em 3 Vermes Escondidos.', risk: 'Vermes intestinais podem passar para pessoas (zoonoses).' },
    sofa:       { name: 'Sofá Sedentário', icon: '🛋️', hp: 170, speed: 0.45, bounty: 11, color: 0x8d6e63, size: 0.44, tags: [], healAura: 6, shape: 'box', diff: 3,
                  behavior: 'Lento; cura inimigos próximos.', risk: 'Sedentarismo: ganho de peso, tédio e perda de massa muscular.' },
    lixeira:    { name: 'Lixeira Tentadora', icon: '🗑️', hp: 70, speed: 0.95, bounty: 8, color: 0x6c8a8a, size: 0.33, tags: [], stealOnLeak: 25, shape: 'box', diff: 3,
                  behavior: 'Se escapar, rouba 25 Moedas de Cuidado.', risk: 'Revirar o lixo: intoxicação, ossos cozidos e corpos estranhos.' },
    fogos:      { name: 'Fogos Assustadores', icon: '🎆', hp: 30, speed: 1.75, bounty: 6, color: 0xff3df2, size: 0.25, tags: ['flying'], stunOnDeath: 1.0, shape: 'fly', diff: 3,
                  behavior: 'Voa rápido; ao estourar, atordoa torres próximas por 1s.', risk: 'Fobia de barulhos: fugas e pânico em dias de fogos.' },
    dorSilenciosa:{ name: 'Dor Silenciosa', icon: '🫥', hp: 120, speed: 0.75, bounty: 10, color: 0x9fa8da, size: 0.36, tags: ['hidden'], armor: 2, shape: 'ghost', diff: 4,
                  behavior: 'Oculta e blindada: só é atingida quando revelada.', risk: 'Pets escondem dor: mudanças sutis de comportamento são alertas.' }
  };

  /* ---------------------------------------------------------------
     CHEFÕES (5)
     --------------------------------------------------------------- */
  const bosses = {
    nevoa: {
      name: 'Névoa da Negligência', icon: '🌁', hp: 1400, speed: 0.32, bounty: 120, color: 0x9aa5b1, size: 0.9, armor: 2,
      attacks: ['Bruma Densa: a cada 8s reduz 30% do alcance de todas as torres por 4s.',
                'Esquecimento: bloqueia melhorias por 4s a cada 12s.',
                'Neblina Rasteira: invoca 2 Vermes Escondidos a cada 10s.'],
      pattern: 'Avança devagar, alterna Bruma e Esquecimento. Fica mais rápida abaixo de 40% de vida.',
      weakness: 'Cura e visão: Olhar Lunar (Luna) ou Visão de Túnel (Dash) dissipam a bruma e deixam o chefão vulnerável (+50% dano) por 6s. Inimigos no alcance de Torres Veterinárias e os disparos do Farol causam +30%.',
      quote: '“Depois eu vejo isso…” — sussurra a Névoa.'
    },
    sombraEstresse: {
      name: 'Sombra do Estresse', icon: '🌪️', hp: 2300, speed: 0.4, bounty: 160, color: 0xff3b5c, size: 0.9, armor: 2,
      attacks: ['Pânico: a cada 7s acelera todos os inimigos em 50% por 3s.',
                'Ilusões: cria 3 cópias falsas que atraem disparos.',
                'Caos: embaralha o modo de mira das torres a cada 15s.'],
      pattern: 'Ciclo rápido de Pânico → Ilusões → Caos. Na metade da vida, ilusões dobram.',
      weakness: 'Calma e precisão: enquanto estiver lenta (Fonte, Brinquedo, Relógio) recebe +40% de dano. A Investida de Pino causa dano dobrado.',
      quote: '“Mais rápido! Mais barulho! Mais tudo!”'
    },
    eco: {
      name: 'Eco da Confusão', icon: '🌀', hp: 2800, speed: 0.38, bounty: 200, color: 0xb388ff, size: 0.95, armor: 3,
      attacks: ['Clones de Mitos: aos 75%, 50% e 25% de vida cria 3 clones, cada um vulnerável a um único tipo de torre.',
                'Boato Ensurdecedor: torres próximas erram 30% dos disparos.',
                'Eco: repete o último inimigo derrotado na entrada.'],
      pattern: 'Divide-se em clones; cada clone mostra o ícone da torre que o derrota.',
      weakness: 'Conhecimento: responder corretamente o Desafio do Eco durante a batalha atordoa o chefão por 4s e tira 50% da vida dos clones.',
      quote: '“Ouvi dizer que gato não precisa de veterinário…”'
    },
    devorador: {
      name: 'Devorador do Tempo', icon: '⌛', hp: 3600, speed: 0.36, bounty: 240, color: 0xc9a227, size: 1.0, armor: 4,
      attacks: ['Congelar: a cada 9s congela 3 torres por 3s.',
                'Fome de Moedas: rouba 8 Moedas a cada 5s.',
                'Atraso: aumenta em 50% o custo das melhorias enquanto vivo.'],
      pattern: 'Lento e implacável; a cada 25% de vida perdida congela mais torres.',
      weakness: 'Velocidade: torres com cadência alta (≥1.2/s) causam +30%. Investida Relâmpago de Pino causa x3. Casulo de Bolt deixa torres imunes ao congelamento.',
      quote: '“Amanhã você leva ao veterinário… ou depois de amanhã…”'
    },
    vazio: {
      name: 'O Vazio', icon: '🕳️', hp: 6500, speed: 0.3, bounty: 400, color: 0x2a1840, size: 1.15, armor: 4,
      attacks: ['Fase 1 (100–66%): Bruma Densa + Congelar.',
                'Fase 2 (66–33%): Pânico + Clones de Mitos.',
                'Fase 3 (33–0%): todos os ataques, muda o clima para Tempestade e embaralha os caminhos.'],
      pattern: 'Três fases; entre fases fica invulnerável por 3s e invoca uma horda mista.',
      weakness: 'Harmonia: usar as 4 habilidades dos heróis em até 15s ativa “Harmonia do Reino”, que tira 15% da vida máxima do Vazio e o atordoa por 5s.',
      quote: '“Sem cuidado… sem atenção… só o Vazio.”'
    }
  };

  /* ---------------------------------------------------------------
     HERÓIS
     --------------------------------------------------------------- */
  const heroes = [
    { id: 'dash', name: 'Dash', breed: 'Dachshund', key: '1', color: 0x9c5a2c, ability: 'Visão de Túnel', icon: '🌭', cost: 30, cd: 20,
      desc: 'Revela todos os inimigos ocultos por 10s (+20% de dano neles) e fareja um caminho secreto com baú.', personality: 'Corajoso, baixinho, engraçado e estrategista.' },
    { id: 'bolt', name: 'Bolt', breed: 'Shih Tzu', key: '2', color: 0xf5e6c8, ability: 'Casulo de Pelagem', icon: '🧸', cost: 40, cd: 30,
      desc: 'Por 8s as torres ficam invulneráveis e imunes a congelamento, e o Santuário não perde vidas.', personality: 'Fofo, resistente, leal e um pouco teimoso.' },
    { id: 'pino', name: 'Pino', breed: 'Pinscher', key: '3', color: 0x2b1d14, ability: 'Investida Relâmpago', icon: '⚡', cost: 35, cd: 18,
      desc: 'Corre pelo caminho causando dano em linha e empurrando os inimigos para trás.', personality: 'Ágil, impulsivo, engraçado e competitivo.' },
    { id: 'luna', name: 'Luna', breed: 'Gata branca', key: '4', color: 0xffffff, ability: 'Olhar Lunar', icon: '🌙', cost: 40, cd: 28,
      desc: 'Cura todas as torres, remove efeitos de clima por 10s e marca inimigos (+25% de dano) por 8s.', personality: 'Elegante, calma, sábia e um pouco sarcástica.' }
  ];

  const combos = [
    { ids: ['bolt','luna'], window: 4, name: 'Escudo Lunar', desc: 'Torres regeneram vida e ganham +15% de cadência por 8s.' },
    { ids: ['dash','pino'], window: 4, name: 'Rastro Certeiro', desc: 'A Investida de Pino causa dano dobrado em inimigos revelados.' },
    { ids: ['dash','bolt','pino','luna'], window: 15, name: 'Harmonia do Reino', desc: 'Atordoa tudo por 3s e causa 10% da vida máxima a todos (15% no Vazio).' }
  ];

  /* ---------------------------------------------------------------
     SINERGIAS ENTRE TORRES (vizinhas = até 1.5 casa de distância)
     --------------------------------------------------------------- */
  const synergies = [
    { a: 'agua', b: 'escova', name: 'Banho & Escovação', desc: 'Escova +30% dano e +0.3 alcance.', bonus: { escova: { dmg: 0.3, range: 0.3 } } },
    { a: 'agua', b: 'tigela', name: 'Refeição Completa', desc: 'Ambas +15% dano.', bonus: { agua: { dmg: 0.15 }, tigela: { dmg: 0.15 } } },
    { a: 'antipulgas', b: 'vacina', name: 'Prevenção Total', desc: 'Antipulgas +25% dano; Vacina barreiras +40% vida.', bonus: { antipulgas: { dmg: 0.25 }, vacina: { barrier: 0.4 } } },
    { a: 'brinquedo', b: 'osso', name: 'Hora da Brincadeira', desc: 'Ambas +20% cadência.', bonus: { brinquedo: { rate: 0.2 }, osso: { rate: 0.2 } } },
    { a: 'vet', b: 'farol', name: 'Diagnóstico Precoce', desc: 'Farol +25% dano; Veterinária +0.5 alcance.', bonus: { farol: { dmg: 0.25 }, vet: { range: 0.5 } } },
    { a: 'coracao', b: 'relogio', name: 'Rotina com Afeto', desc: 'Relógio gera +50% moedas.', bonus: { relogio: { income: 0.5 } } },
    { a: 'areia', b: 'brinquedo', name: 'Ambiente Enriquecido', desc: 'Caixa de Areia prende +50% tempo.', bonus: { areia: { stun: 0.5 } } },
    { a: 'vet', b: 'vacina', name: 'Carteirinha em Dia', desc: 'Vacina +30% dano e barreiras +30% vida.', bonus: { vacina: { dmg: 0.3, barrier: 0.3 } } },
    { a: 'tigela', b: 'osso', name: 'Nutrição & Exercício', desc: 'Ambas +15% dano e +0.2 alcance.', bonus: { tigela: { dmg: 0.15, range: 0.2 }, osso: { dmg: 0.15, range: 0.2 } } },
    { a: 'antipulgas', b: 'escova', name: 'Pente Antiparasitário', desc: 'Escova causa dano triplo em parasitas.', bonus: { escova: { parasite: 2 } } }
  ];

  /* ---------------------------------------------------------------
     CLIMA
     --------------------------------------------------------------- */
  const weather = {
    clear: { name: 'Céu Limpo', icon: '☀️', range: 1, rate: 1, enemySpeed: 1, desc: 'Sem efeitos.' },
    rain:  { name: 'Chuva', icon: '🌧️', range: 0.9, rate: 1, enemySpeed: 0.9, desc: 'Alcance -10%, inimigos -10% velocidade, Fonte da Vida +20% dano.' },
    fog:   { name: 'Neblina', icon: '🌫️', range: 0.75, rate: 1, enemySpeed: 1, desc: 'Alcance -25% (Farol ignora). Olhar Lunar dissipa.' },
    night: { name: 'Noite', icon: '🌙', range: 0.85, rate: 1, enemySpeed: 1, desc: 'Alcance -15% (Farol ignora). Visão de Túnel compensa.' },
    storm: { name: 'Tempestade', icon: '⛈️', range: 0.9, rate: 0.85, enemySpeed: 1.1, desc: 'Cadência -15%, alcance -10%, inimigos +10% velocidade.' }
  };

  /* ---------------------------------------------------------------
     MUNDOS (fases da campanha)
     grid: 18 x 11 casas. paths: lista de waypoints [coluna, linha].
     risky: índice do caminho perigoso (inimigos nele dão +50% moedas).
     tunnels: [índice do caminho, distância percorrida] onde surgem ocultos.
     waves: "tipo:quantidade:intervalo, ..." — uma string por onda.
     events: o que acontece ANTES de cada onda (1-index).
     --------------------------------------------------------------- */
  const worlds = [
    {
      id: 1, name: 'Campina dos Filhotes', boss: 'nevoa', weather: ['clear'], startCoins: 230, lives: 20,
      palette: { ground: 0x7ccf6a, ground2: 0x6cbf5c, path: 0xe8c995, deco: 0x3f9d4a, sky: 0xbfe8ff, fog: 0xd8f1ff },
      paths: [
        [[0,5],[3,5],[3,1],[10,1],[10,3],[14,3],[14,5],[17,5]],
        [[0,5],[3,5],[3,8],[9,8],[9,6],[14,6],[14,5],[17,5]]
      ],
      risky: 1, tunnels: [[0, 11], [1, 12]],
      waves: [
        'pulga:6:1.1',
        'pulga:8:0.8, carrapato:1:2',
        'pulga:6:0.8, verme:4:0.9',
        'mosquito:5:1.0, pulga:6:0.6',
        'gordurinha:2:3, carrapato:3:1.6, pulga:8:0.5',
        'verme:6:0.6, mosquito:6:0.8',
        'petisco:4:1.2, gordurinha:3:2.5, pulga:10:0.4',
        'carrapato:5:1.2, mosquito:8:0.6, verme:6:0.6',
        'chefeHorda:1:1, pulga:12:0.4, gordurinha:3:2',
        'nevoa:1:1, pulga:10:0.6, carrapato:4:2, mosquito:6:1'
      ],
      events: { 3: 'quiz', 5: 'choice', 6: 'quiz', 8: 'choice', 9: 'quiz', 10: 'bossIntro' },
      choices: ['buildOrUpgrade', 'saveOrSpend'],
      chests: [2, 4, 7],
      intro: 'A Névoa da Negligência cobriu a Campina! Filhotes precisam de vacinas, vermífugo e muito carinho. Dash, Bolt, Pino e Luna contam com você!'
    },
    {
      id: 2, name: 'Bosque das Coceirinhas', boss: 'sombraEstresse', weather: ['rain'], startCoins: 260, lives: 20,
      palette: { ground: 0x4fae8c, ground2: 0x46a07f, path: 0xc9a77c, deco: 0x2e7d5b, sky: 0x9fc7c9, fog: 0xa7c4c4 },
      paths: [
        [[0,1],[5,1],[5,4],[12,4],[12,1],[16,1],[16,9],[17,9]],
        [[0,1],[5,1],[5,4],[8,4],[8,9],[17,9]]
      ],
      risky: 1, tunnels: [[0, 14], [1, 11]],
      waves: [
        'pulga:10:0.6, sarninha:2:1.5',
        'nozinho:4:1.2, pulga:8:0.5',
        'carrapato:4:1.4, sarninha:4:1.0',
        'mosquito:8:0.7, verme:6:0.7',
        'tedio:3:2, nozinho:5:1.0, pulga:10:0.4',
        'estressinho:4:1.0, sarninha:6:0.8, carrapato:3:1.5',
        'lombriga:3:2.2, mosquito:8:0.6',
        'tedio:4:1.5, estressinho:5:0.8, nozinho:6:0.8',
        'chefeHorda:2:6, sarninha:8:0.6, mosquito:8:0.6',
        'sombraEstresse:1:1, estressinho:6:1.2, pulga:12:0.4, tedio:3:3'
      ],
      events: { 2: 'quiz', 4: 'choice', 5: 'quiz', 7: 'choice', 8: 'quiz', 10: 'bossIntro' },
      choices: ['healOrDamage', 'secretPath'],
      chests: [3, 6, 8],
      intro: 'A chuva trouxe coceira ao Bosque! Escovação, controle de parasitas e rotina vão acalmar a Sombra do Estresse.'
    },
    {
      id: 3, name: 'Pântano do Eco', boss: 'eco', weather: ['fog'], startCoins: 290, lives: 20,
      palette: { ground: 0x6f8f6a, ground2: 0x67855f, path: 0x9b8c6a, deco: 0x4a5d3f, sky: 0xb7b2c9, fog: 0xc9c4d8 },
      paths: [
        [[0,9],[4,9],[4,6],[1,6],[1,2],[7,2],[7,5],[11,5],[11,1],[17,1]],
        [[0,9],[4,9],[13,9],[13,4],[15,4],[15,1],[17,1]]
      ],
      risky: 1, tunnels: [[0, 16], [1, 12]],
      waves: [
        'mito:5:1.0, pulga:8:0.6',
        'verme:8:0.6, tartaro:2:2',
        'zumbido:4:1.2, petisco:4:1.2',
        'dorSilenciosa:2:3, mito:6:0.8',
        'lombriga:4:2, tartaro:3:1.5',
        'mito:8:0.6, zumbido:5:1.0, verme:8:0.5',
        'dorSilenciosa:4:2, petisco:6:0.8',
        'tartaro:6:1.0, lombriga:4:1.8, mito:6:0.8',
        'chefeHorda:2:5, dorSilenciosa:3:2, zumbido:6:0.8',
        'eco:1:1, mito:10:0.7, verme:10:0.5, tartaro:4:2'
      ],
      events: { 2: 'quiz', 4: 'choice', 5: 'quiz', 7: 'choice', 8: 'quiz', 10: 'bossIntro' },
      choices: ['preventOrSave', 'heroTraining'],
      chests: [3, 5, 8],
      intro: 'No Pântano, mitos ecoam por todo lado! Só o conhecimento verdadeiro dissipa a neblina do Eco da Confusão.'
    },
    {
      id: 4, name: 'Cidade das Pressas', boss: 'devorador', weather: ['night'], startCoins: 320, lives: 20,
      palette: { ground: 0x5d6d8a, ground2: 0x56657f, path: 0xa3a3b8, deco: 0x3a4660, sky: 0x2b3352, fog: 0x2b3352 },
      paths: [
        [[0,5],[2,5],[2,1],[15,1],[15,5],[17,5]],
        [[0,5],[2,5],[2,9],[6,9],[6,6],[10,6],[10,9],[15,9],[15,5],[17,5]]
      ],
      risky: 0, tunnels: [[1, 14], [0, 10]],
      waves: [
        'estressinho:6:0.8, calorao:4:1.0',
        'lixeira:4:1.4, fogos:5:0.9',
        'sofa:2:3, gordurinha:2:3, estressinho:4:1.0',
        'calorao:8:0.6, tedio:3:1.6',
        'fogos:8:0.6, lixeira:5:1.0, dorSilenciosa:2:2',
        'sofa:3:2.4, estressinho:8:0.6, calorao:6:0.7',
        'tedio:5:1.2, fogos:8:0.5, gordurinha:3:2',
        'lixeira:6:0.9, sofa:3:2, zumbido:6:0.8',
        'chefeHorda:3:5, estressinho:10:0.5, fogos:8:0.6',
        'devorador:1:1, sofa:3:3, fogos:10:0.6, lixeira:6:1.2'
      ],
      events: { 2: 'quiz', 4: 'choice', 5: 'quiz', 7: 'choice', 8: 'quiz', 10: 'bossIntro' },
      choices: ['routineOrCoins', 'saveOrSpend'],
      chests: [3, 6, 8],
      intro: 'Na Cidade das Pressas ninguém tem tempo para nada! O Devorador do Tempo quer adiar todos os cuidados. Vamos mostrar que prevenção não espera.'
    },
    {
      id: 5, name: 'Abismo do Vazio', boss: 'vazio', weather: ['storm','night','fog','rain'], startCoins: 360, lives: 20,
      palette: { ground: 0x4a3f6b, ground2: 0x433862, path: 0x8e7cc3, deco: 0x2d2350, sky: 0x1b1430, fog: 0x2a2045 },
      paths: [
        [[0,1],[8,1],[8,5],[3,5],[3,9],[17,9]],
        [[0,1],[14,1],[14,6],[11,6],[11,9],[17,9]]
      ],
      risky: 1, tunnels: [[0, 18], [1, 17]],
      waves: [
        'pulga:12:0.4, mosquito:6:0.7, carrapato:3:1.5',
        'tartaro:4:1.2, mito:6:0.7, sarninha:5:0.9',
        'dorSilenciosa:3:2, lombriga:3:2, estressinho:6:0.7',
        'fogos:8:0.6, calorao:8:0.6, gordurinha:3:2',
        'chefeHorda:2:5, tedio:4:1.5, nozinho:6:0.8',
        'sofa:3:2, zumbido:6:0.8, mito:8:0.6',
        'lixeira:6:0.9, petisco:6:0.8, dorSilenciosa:3:2',
        'lombriga:5:1.5, estressinho:8:0.5, fogos:8:0.5',
        'chefeHorda:3:4, sofa:3:2, tartaro:6:0.8, mosquito:10:0.4',
        'vazio:1:1, chefeHorda:2:8, mito:10:0.6, dorSilenciosa:4:3, estressinho:10:0.6'
      ],
      events: { 2: 'quiz', 3: 'choice', 5: 'quiz', 6: 'choice', 8: 'quiz', 9: 'choice', 10: 'bossIntro' },
      choices: ['healOrDamage', 'heroTraining', 'buildOrUpgrade'],
      chests: [2, 4, 7],
      intro: 'O Abismo muda de clima a cada onda. É a última defesa: tudo o que você aprendeu será testado contra O Vazio!'
    }
  ];

  /* ---------------------------------------------------------------
     ESCOLHAS MORAIS (sem certo/errado — só consequências)
     effect keys: coins, energy, lives, healAll, bossDmg, dmgMult, healMult,
                  freeTower, upgradeDiscount, blockPath, riskyBonus,
                  cleanBonus, prevention, cdMult, bonusQuiz
     --------------------------------------------------------------- */
  const choices = {
    saveOrSpend: {
      title: 'Restaurar agora ou guardar para o chefão?',
      text: 'A defesa está cansada depois de tantas ondas. Bolt sugere investir agora; Dash prefere guardar energia para o chefão.',
      options: [
        { label: 'Restaurar todas as torres (−50 moedas)', who: 'bolt', effect: { coins: -50, healAll: true, energy: 15 }, note: 'Cuidar a tempo evita problemas maiores.' },
        { label: 'Guardar recursos: +25% de dano no chefão', who: 'dash', effect: { bossDmg: 0.25 }, note: 'Planejar também é cuidar.' }
      ]
    },
    healOrDamage: {
      title: 'Priorizar cura ou dano?',
      text: 'Luna oferece um ritual lunar. Ela pode fortalecer a cura do reino ou afiar as defesas.',
      options: [
        { label: 'Cura: torres regeneram e curas +50%', who: 'luna', effect: { healMult: 0.5, regen: 1.5 }, note: 'Bem-estar sustenta a defesa a longo prazo.' },
        { label: 'Dano: todas as torres +15% de dano', who: 'pino', effect: { dmgMult: 0.15 }, note: 'Às vezes é preciso agir rápido.' }
      ]
    },
    buildOrUpgrade: {
      title: 'Construir mais torres ou melhorar as existentes?',
      text: 'Um mercador gentil passou pelo reino com duas ofertas.',
      options: [
        { label: 'Próxima torre é gratuita', who: 'dash', effect: { freeTower: 1 }, note: 'Mais cobertura no mapa.' },
        { label: '−40% no custo das próximas 3 melhorias', who: 'bolt', effect: { upgradeDiscount: 3 }, note: 'Qualidade acima de quantidade.' }
      ]
    },
    secretPath: {
      title: 'A trilha perigosa',
      text: 'Dash farejou que o caminho perigoso tem recompensas maiores. Mas mais inimigos chegam rápido por ele…',
      options: [
        { label: 'Abrir tudo: caminho perigoso dá +100% moedas', who: 'pino', effect: { riskyBonus: 0.5 }, note: 'Alto risco, alta recompensa.' },
        { label: 'Fechar a trilha perigosa por 2 ondas', who: 'bolt', effect: { blockPath: 2 }, note: 'Segurança em primeiro lugar.' }
      ]
    },
    preventOrSave: {
      title: 'Prevenção ou economia?',
      text: 'Luna lembra: prevenir costuma custar menos do que tratar.',
      options: [
        { label: 'Investir em prevenção (−70 moedas): próximas 2 ondas com −25% de vida', who: 'luna', effect: { coins: -70, prevention: 2 }, note: 'Prevenção é o melhor remédio.' },
        { label: 'Guardar as moedas (+30 agora)', who: 'dash', effect: { coins: 30 }, note: 'Reserva para emergências.' }
      ]
    },
    heroTraining: {
      title: 'Treino dos heróis',
      text: 'Os heróis podem treinar agilidade ou descansar e recarregar as energias.',
      options: [
        { label: 'Treino: recargas −25% até o fim da fase', who: 'pino', effect: { cdMult: 0.25 }, note: 'Exercício regular faz bem!' },
        { label: 'Descanso: +50 de energia agora', who: 'bolt', effect: { energy: 50 }, note: 'Descansar também é saúde.' }
      ]
    },
    routineOrCoins: {
      title: 'Rotina ou recompensa imediata?',
      text: 'O Relógio da Rotina propõe um pacto: constância é recompensada.',
      options: [
        { label: 'Rotina: +1 vida a cada onda sem vazamentos', who: 'luna', effect: { cleanBonus: 1 }, note: 'Pequenos hábitos diários somam muito.' },
        { label: 'Recompensa: +60 moedas agora', who: 'pino', effect: { coins: 60 }, note: 'Recursos para agir já.' }
      ]
    }
  };

  /* ---------------------------------------------------------------
     40 PERGUNTAS EDUCATIVAS
     a = índice da alternativa correta (0–3). card = cartão desbloqueado.
     --------------------------------------------------------------- */
  const questions = [
    { topic: 'Alimentos tóxicos', q: 'Qual alimento pode ser tóxico para cães?', o: ['Maçã sem sementes', 'Chocolate', 'Cenoura cozida', 'Abóbora cozida'], a: 1, exp: 'Chocolate contém teobromina, que pode causar intoxicação grave em cães. Se houver ingestão, procure orientação veterinária rapidamente.', card: 'c06' },
    { topic: 'Alimentos tóxicos', q: 'Uvas e uvas-passas para cães são…', o: ['Um petisco saudável', 'Seguras em pequena quantidade', 'Potencialmente tóxicas aos rins', 'Boas para os dentes'], a: 2, exp: 'Mesmo pequenas quantidades de uva ou passa podem causar lesão renal em alguns cães. Evite oferecer e procure o veterinário se houver ingestão.', card: 'c06' },
    { topic: 'Alimentos tóxicos', q: 'Cebola e alho na comida de cães e gatos podem causar…', o: ['Anemia', 'Pelos mais brilhantes', 'Mais energia', 'Nada, são temperos naturais'], a: 0, exp: 'Cebola e alho (crus, cozidos ou em pó) danificam as células vermelhas do sangue. Evite dar restos de comida temperada.', card: 'c07' },
    { topic: 'Alimentos tóxicos', q: 'O xilitol, adoçante de chicletes e doces "sem açúcar", em cães pode causar…', o: ['Apenas sede', 'Queda brusca de glicose e lesão no fígado', 'Sono tranquilo', 'Nada'], a: 1, exp: 'O xilitol é muito perigoso para cães, mesmo em pequenas doses. Guarde chicletes e produtos diet longe do alcance.', card: 'c07' },
    { topic: 'Plantas e remédios', q: 'Qual planta é extremamente perigosa para gatos?', o: ['Capim-gato', 'Lírio', 'Grama de trigo', 'Hortelã'], a: 1, exp: 'Todas as partes do lírio, até o pólen e a água do vaso, podem causar insuficiência renal em gatos. Prefira flores seguras para pets.', card: 'c08' },
    { topic: 'Plantas e remédios', q: 'Seu gato parece com dor. Pode dar paracetamol?', o: ['Sim, meio comprimido', 'Sim, se for infantil', 'Não: é tóxico para gatos; consulte o veterinário', 'Sim, misturado na ração'], a: 2, exp: 'Paracetamol pode ser fatal para gatos. Nunca medique pets com remédios humanos sem orientação veterinária.', card: 'c08' },
    { topic: 'Vacinação', q: 'Em geral, depois das doses de filhote, um pet adulto precisa de reforço de vacinas…', o: ['Nunca mais', 'Conforme o protocolo do veterinário, geralmente anual', 'Só se ficar doente', 'Só quando viajar'], a: 1, exp: 'A imunidade das vacinas diminui com o tempo. O veterinário define o calendário ideal para o estilo de vida do seu pet.', card: 'c01' },
    { topic: 'Vacinação', q: 'Por que um filhote recebe várias doses de vacina?', o: ['Para dar mais trabalho ao tutor', 'Porque os anticorpos da mãe podem interferir nas primeiras doses', 'Porque a primeira dose sempre falha', 'Não precisa de várias doses'], a: 1, exp: 'Os anticorpos maternos vão caindo aos poucos; a série de doses garante proteção na janela certa. Evite locais de risco até completar o esquema.', card: 'c01' },
    { topic: 'Vermifugação', q: 'Com que frequência vermifugar um pet adulto?', o: ['Só se aparecer verme nas fezes', 'Periodicamente, conforme orientação veterinária e estilo de vida', 'Uma vez na vida', 'Todo dia'], a: 1, exp: 'Muitos vermes não dão sinais visíveis. A frequência depende de idade, ambiente e contato com outros animais — combine com o veterinário.', card: 'c02' },
    { topic: 'Parasitas', q: 'Encontrou pulgas no seu pet. O mais eficaz é…', o: ['Tratar só o pet', 'Tratar o pet, os outros animais da casa e o ambiente', 'Dar banho todo dia', 'Esperar passar'], a: 1, exp: 'A maior parte da população de pulgas (ovos e larvas) fica no ambiente. Trate todos os animais e higienize camas, tapetes e frestas.', card: 'c03' },
    { topic: 'Parasitas', q: 'Carrapatos podem transmitir quais doenças aos cães?', o: ['Erliquiose e babesiose', 'Gripe e resfriado', 'Diabetes', 'Catapora'], a: 0, exp: 'A "doença do carrapato" pode causar febre, apatia e sangramentos. Use carrapaticida regularmente e revise o pelo após passeios.', card: 'c03' },
    { topic: 'Parasitas', q: 'Qual doença pode ser transmitida por mosquitos aos cães?', o: ['Raiva', 'Dirofilariose (verme do coração)', 'Sarna', 'Otite'], a: 1, exp: 'Em regiões de risco, a prevenção da dirofilariose e da leishmaniose inclui repelentes e medicamentos indicados pelo veterinário.', card: 'c04' },
    { topic: 'Peso ideal', q: 'Qual é um bom sinal de peso adequado?', o: ['Não dá para sentir as costelas', 'Sentir as costelas com leve pressão e ver a cintura de cima', 'Barriga bem redondinha', 'Costelas muito aparentes'], a: 1, exp: 'Você deve sentir as costelas sem apertar, e ver uma "cintura" olhando de cima. Na dúvida, o veterinário avalia o escore corporal.', card: 'c09' },
    { topic: 'Nutrição', q: 'Petiscos devem representar no máximo cerca de…', o: ['50% das calorias do dia', '10% das calorias do dia', 'Tudo que o pet quiser', '80% se forem naturais'], a: 1, exp: 'Petiscos em excesso desequilibram a dieta e engordam. Desconte as calorias dos petiscos da porção diária.', card: 'c10' },
    { topic: 'Nutrição', q: 'Gatos adultos e leite de vaca:', o: ['Leite é essencial para gatos', 'Muitos gatos adultos têm intolerância à lactose', 'Leite substitui a água', 'Leite previne cálculos'], a: 1, exp: 'Leite de vaca pode causar diarreia em muitos gatos adultos. Água fresca é a melhor bebida.', card: 'c10' },
    { topic: 'Nutrição', q: 'Um gato (especialmente acima do peso) que para de comer por alguns dias corre risco de…', o: ['Nada, é bom para emagrecer', 'Lipidose hepática (fígado gorduroso)', 'Ficar mais ativo', 'Ganhar músculos'], a: 1, exp: 'Gatos não podem ficar em jejum prolongado. Falta de apetite por mais de 24–48h merece avaliação veterinária.', card: 'c11' },
    { topic: 'Hidratação', q: 'O que costuma estimular os gatos a beber mais água?', o: ['Pote ao lado da caixa de areia', 'Fontes com água corrente e vários potes pela casa', 'Água morna com sal', 'Trocar a água uma vez por semana'], a: 1, exp: 'Muitos gatos preferem água em movimento e potes longe da comida e da areia. Alimento úmido também ajuda na hidratação.', card: 'c12' },
    { topic: 'Hidratação', q: 'Qual pode ser sinal de desidratação?', o: ['Gengiva úmida e rosada', 'Gengiva seca/pegajosa e pele que demora a voltar ao lugar', 'Pelo brilhante', 'Muita energia'], a: 1, exp: 'Olhos fundos, gengiva pegajosa e apatia também são sinais. Em caso de suspeita, procure o veterinário.', card: 'c12' },
    { topic: 'Exercício seguro', q: 'Num dia quente, qual o melhor horário para passear com o cão?', o: ['Meio-dia', 'Início da manhã ou fim da tarde', 'Logo após uma refeição grande', 'Qualquer hora, o asfalto não esquenta'], a: 1, exp: 'Teste o chão com a mão por 7 segundos: se estiver quente para você, está para as patinhas. Leve água no passeio.', card: 'c13' },
    { topic: 'Exercício seguro', q: 'Raças de focinho curto (como o Shih Tzu Bolt) no calor…', o: ['Aguentam mais calor', 'Têm maior risco de superaquecer e devem evitar esforço intenso', 'Precisam correr mais', 'Não precisam de água'], a: 1, exp: 'Cães braquicefálicos respiram com mais dificuldade e perdem calor com menos eficiência. Sombra, água e passeios leves!', card: 'c14' },
    { topic: 'Exercício seguro', q: 'Para a coluna de um Dachshund (como o Dash), o ideal é…', o: ['Incentivar pulos do sofá', 'Usar rampas e evitar saltos e escadas em excesso', 'Carregar pelas patas da frente', 'Exercício só no fim de semana'], a: 1, exp: 'Dachshunds têm predisposição a problemas de disco na coluna. Peso adequado e rampas ajudam a proteger.', card: 'c15' },
    { topic: 'Enriquecimento', q: 'Qual item é um bom enriquecimento ambiental para gatos?', o: ['Arranhadores e prateleiras em lugares altos', 'Ficar sempre no mesmo cômodo vazio', 'Luz laser sem nunca deixar "pegar"', 'Nenhum, gatos não precisam'], a: 0, exp: 'Gatos gostam de arranhar, escalar e observar do alto. Esconderijos e brincadeiras de caça também reduzem o estresse.', card: 'c16' },
    { topic: 'Enriquecimento', q: 'Comedouros tipo quebra-cabeça servem para…', o: ['Deixar o pet com fome', 'Estimular a mente e deixar a refeição mais lenta e divertida', 'Substituir passeios', 'Apenas decorar'], a: 1, exp: 'Brinquedos recheáveis e tapetes de farejar transformam comida em desafio mental e ajudam contra o tédio.', card: 'c17' },
    { topic: 'Comportamento', q: 'Quais comportamentos, quando o cão fica sozinho, podem indicar ansiedade de separação?', o: ['Dormir tranquilo', 'Destruição, choro/latidos insistentes e xixi fora do lugar', 'Brincar com um brinquedo', 'Beber água'], a: 1, exp: 'Esses sinais pedem ajuda, não bronca. Veterinário e adestrador com reforço positivo podem montar um plano gradual.', card: 'c18' },
    { topic: 'Comportamento', q: 'O pet fez xixi no lugar errado horas atrás. Brigar agora…', o: ['Resolve na hora', 'Não ajuda: ele não associa a bronca ao ato e pode ficar com medo', 'Ensina a usar o lugar certo', 'É a única opção'], a: 1, exp: 'Recompense quando ele acerta e investigue causas médicas ou de estresse. Reforço positivo cria confiança.', card: 'c19' },
    { topic: 'Caixa de areia', q: 'Quantas caixas de areia são recomendadas para 2 gatos?', o: ['1', '2', '3', 'Nenhuma, eles se viram'], a: 2, exp: 'A regra prática é uma caixa por gato + uma extra, em locais calmos. Limpe diariamente.', card: 'c20' },
    { topic: 'Emergências', q: 'Um gato macho vai várias vezes à caixa e quase não sai xixi. O que fazer?', o: ['Esperar até amanhã', 'Procurar atendimento veterinário com urgência', 'Trocar a areia', 'Dar mais ração'], a: 1, exp: 'Pode ser obstrução urinária, uma emergência que coloca a vida em risco em poucas horas.', card: 'c21' },
    { topic: 'Dentes', q: 'Para escovar os dentes do pet, use…', o: ['Pasta de dente humana', 'Pasta específica para pets', 'Bicarbonato puro', 'Sal grosso'], a: 1, exp: 'Pastas humanas podem conter flúor e xilitol, perigosos se engolidos. Comece aos poucos e com muito elogio.', card: 'c22' },
    { topic: 'Dentes', q: 'Mau hálito persistente no pet pode indicar…', o: ['Que ele é feliz', 'Doença periodontal (tártaro e gengivite)', 'Fome', 'Excesso de água'], a: 1, exp: 'Tártaro e gengivite causam dor e podem afetar outros órgãos. Escovação e avaliações odontológicas ajudam.', card: 'c22' },
    { topic: 'Unhas', q: 'Um sinal de que as unhas do cão estão compridas é…', o: ['Ouvir as unhas batendo no chão ao andar', 'Ele dormir muito', 'Pelo caindo', 'Beber mais água'], a: 0, exp: 'Unhas longas alteram a pisada e podem quebrar. Corte só a ponta, evitando o vaso sanguíneo (o "sabugo").', card: 'c23' },
    { topic: 'Orelhas', q: 'Pet sacudindo muito a cabeça e coçando a orelha com odor forte. Provável…', o: ['Alergia a carinho', 'Otite: leve ao veterinário', 'Normal, é mania', 'Falta de banho'], a: 1, exp: 'Não use cotonete no fundo do ouvido nem remédios por conta própria. O tratamento depende da causa.', card: 'c24' },
    { topic: 'Sinais de dor', q: 'Qual pode ser um sinal de dor em gatos?', o: ['Esconder-se mais, cuidar menos do pelo e postura encolhida', 'Ronronar sempre significa estar bem', 'Pular em lugares altos', 'Comer normalmente'], a: 0, exp: 'Gatos escondem a dor. Mudanças de hábitos, apetite ou humor merecem atenção e avaliação.', card: 'c25' },
    { topic: 'Vômito e diarreia', q: 'Quando vômito ou diarreia exigem veterinário rapidamente?', o: ['Nunca', 'Se persistirem, tiverem sangue, ou houver apatia — e logo em filhotes e idosos', 'Só depois de uma semana', 'Só se o pet parar de latir'], a: 1, exp: 'Filhotes e idosos desidratam rápido. Não ofereça remédios humanos; leve informações sobre quando começou e frequência.', card: 'c26' },
    { topic: 'Emergências', q: 'Cão grande com barriga inchada, inquieto e tentando vomitar sem conseguir. É…', o: ['Gases normais', 'Possível torção gástrica: emergência imediata', 'Fome', 'Preguiça'], a: 1, exp: 'A dilatação-torção gástrica pode ser fatal em horas. Vá direto ao atendimento de emergência.', card: 'c21' },
    { topic: 'Filhotes', q: 'O período mais importante de socialização do filhote de cão é aproximadamente…', o: ['Entre 3 e 14 semanas de vida', 'Depois de 2 anos', 'Só na velhice', 'Não existe'], a: 0, exp: 'Apresente pessoas, sons e ambientes com segurança e de forma positiva, respeitando o protocolo de vacinas.', card: 'c27' },
    { topic: 'Idosos', q: 'Para pets idosos, o check-up costuma ser recomendado…', o: ['A cada 5 anos', 'A cada 6 meses', 'Nunca, já são velhinhos', 'Só em emergências'], a: 1, exp: 'Idosos mudam mais rápido; exames frequentes detectam doenças renais, cardíacas e articulares cedo.', card: 'c28' },
    { topic: 'Idosos', q: 'Cão idoso desorientado, trocando o dia pela noite e "esquecendo" hábitos. Pode ser…', o: ['Teimosia', 'Disfunção cognitiva: converse com o veterinário', 'Falta de bronca', 'Normal e sem solução'], a: 1, exp: 'Há manejo, dieta e enriquecimento que melhoram a qualidade de vida. Rotina estável ajuda muito.', card: 'c29' },
    { topic: 'Consultas preventivas', q: 'Para um pet adulto saudável, o check-up preventivo deve ser feito pelo menos…', o: ['Uma vez por ano', 'Uma vez na vida', 'Só quando adoece', 'A cada 10 anos'], a: 0, exp: 'Consultas anuais revisam vacinas, peso, dentes, pele e exames, pegando problemas antes de ficarem graves.', card: 'c05' },
    { topic: 'Bem-estar', q: 'Identificação com plaquinha e microchip servem para…', o: ['Enfeitar', 'Aumentar a chance de reencontrar o pet se ele se perder', 'Substituir a vacina', 'Nada'], a: 1, exp: 'Mantenha os dados de contato atualizados. Em dias de fogos e viagens, o risco de fuga aumenta.', card: 'c30' },
    { topic: 'Vínculo e rotina', q: 'Um gato que pisca devagar olhando para você provavelmente está…', o: ['Com raiva', 'Relaxado e confiante', 'Com sono profundo', 'Com dor nos olhos'], a: 1, exp: 'O "piscar lento" é um sinal de confiança. Experimente piscar devagar de volta!', card: 'c31' }
  ];

  /* ---------------------------------------------------------------
     30 CARTÕES DE CUIDADO COLECIONÁVEIS
     (ids c01–c31, c32 sem pergunta: desbloqueados por fases/baús)
     --------------------------------------------------------------- */
  const cards = [
    { id: 'c01', cat: 'Prevenção', icon: '💉', title: 'Carteirinha em Dia', text: 'Guarde a carteira de vacinação e anote as datas dos reforços. Peça ao veterinário um calendário personalizado.' },
    { id: 'c02', cat: 'Prevenção', icon: '🪱', title: 'Vermífugo Programado', text: 'Programe lembretes no celular para o vermífugo. A frequência depende do estilo de vida do pet.' },
    { id: 'c03', cat: 'Prevenção', icon: '🦗', title: 'Pulgas & Carrapatos', text: 'Antiparasitário regular + revisar o pelo após passeios em grama. Trate também o ambiente.' },
    { id: 'c04', cat: 'Prevenção', icon: '🦟', title: 'Escudo contra Mosquitos', text: 'Em áreas de risco, pergunte sobre coleiras repelentes e prevenção de dirofilariose e leishmaniose.' },
    { id: 'c05', cat: 'Prevenção', icon: '🩺', title: 'Check-up Anual', text: 'Uma consulta preventiva por ano para adultos (a cada 6 meses para idosos) revisa tudo da cabeça às patinhas.' },
    { id: 'c06', cat: 'Nutrição', icon: '🍫', title: 'Lista Proibida I', text: 'Chocolate, café, uva e passa: nunca para cães. Em caso de ingestão, ligue para o veterinário.' },
    { id: 'c07', cat: 'Nutrição', icon: '🧅', title: 'Lista Proibida II', text: 'Cebola, alho, xilitol, álcool e massa crua de pão são perigosos. Cuidado com restos de comida temperada.' },
    { id: 'c08', cat: 'Nutrição', icon: '🌷', title: 'Casa Segura', text: 'Lírios (para gatos) e remédios humanos como paracetamol e ibuprofeno são tóxicos. Guarde fora do alcance.' },
    { id: 'c09', cat: 'Nutrição', icon: '⚖️', title: 'Peso Ideal', text: 'Costelas palpáveis com leve pressão e cintura visível. Pese o pet a cada 1–2 meses.' },
    { id: 'c10', cat: 'Nutrição', icon: '🦴', title: 'Regra dos 10%', text: 'Petiscos: no máximo ~10% das calorias diárias. Pedaços de cenoura ou maçã sem sementes são boas opções para cães.' },
    { id: 'c11', cat: 'Nutrição', icon: '🐈', title: 'Gato Não Faz Jejum', text: 'Falta de apetite por mais de 24–48h em gatos merece consulta. Mudanças de ração devem ser graduais (7–10 dias).' },
    { id: 'c12', cat: 'Hidratação', icon: '💧', title: 'Água Sempre Fresca', text: 'Troque a água ao menos 1x ao dia, lave o pote e espalhe potes pela casa. Fontes ajudam gatos a beber mais.' },
    { id: 'c13', cat: 'Exercício', icon: '🌡️', title: 'Teste dos 7 Segundos', text: 'Mão no asfalto por 7 segundos: se queimar você, queima as patinhas. Passeie cedo ou no fim da tarde.' },
    { id: 'c14', cat: 'Exercício', icon: '🥵', title: 'Focinho Curto, Calor Curto', text: 'Raças braquicefálicas superaquecem fácil. Sombra, água, ritmo leve e nunca deixar no carro fechado.' },
    { id: 'c15', cat: 'Exercício', icon: '🪜', title: 'Coluna Protegida', text: 'Rampas para sofá e cama, peso adequado e evitar pulos: essencial para Dachshunds e cães de coluna longa.' },
    { id: 'c16', cat: 'Enriquecimento', icon: '🐾', title: 'Mundo Vertical', text: 'Gatos amam altura: prateleiras, arranhadores firmes e esconderijos reduzem o estresse.' },
    { id: 'c17', cat: 'Enriquecimento', icon: '🧩', title: 'Comer Brincando', text: 'Comedouros quebra-cabeça e tapetes de farejar transformam a refeição em exercício mental.' },
    { id: 'c18', cat: 'Comportamento', icon: '🚪', title: 'Sozinho Sem Sofrer', text: 'Treine ausências curtas e graduais, saídas sem drama e um brinquedo especial para quando ficar sozinho.' },
    { id: 'c19', cat: 'Comportamento', icon: '🏅', title: 'Reforço Positivo', text: 'Recompense o comportamento certo na hora. Bronca depois do fato gera medo, não aprendizado.' },
    { id: 'c20', cat: 'Higiene', icon: '📦', title: 'Regra N+1', text: 'Uma caixa de areia por gato + uma extra, longe da comida e em local tranquilo. Limpeza diária.' },
    { id: 'c21', cat: 'Alerta', icon: '🚨', title: 'Emergência Não Espera', text: 'Dificuldade para respirar, gengiva pálida/arroxeada, barriga inchada, não conseguir urinar ou convulsão: vá já ao veterinário.' },
    { id: 'c22', cat: 'Higiene', icon: '🪥', title: 'Sorriso Saudável', text: 'Escove os dentes com pasta para pets, idealmente todos os dias. Comece devagar e com petiscos.' },
    { id: 'c23', cat: 'Higiene', icon: '✂️', title: 'Unhas na Medida', text: 'Corte só a pontinha, evitando o vaso. Se tiver dúvida, peça para o veterinário ensinar.' },
    { id: 'c24', cat: 'Higiene', icon: '👂', title: 'Orelhas Limpas', text: 'Limpe só a parte visível com produto indicado. Coceira, odor ou cabeça sacudindo: consulta.' },
    { id: 'c25', cat: 'Alerta', icon: '🫥', title: 'Dor Silenciosa', text: 'Esconder-se, mancar, lamber uma região, mudar o humor ou o apetite podem ser sinais de dor.' },
    { id: 'c26', cat: 'Alerta', icon: '🤢', title: 'Vômito & Diarreia', text: 'Persistente, com sangue, com apatia, ou em filhote/idoso: procure o veterinário. Não use remédios humanos.' },
    { id: 'c27', cat: 'Fases da vida', icon: '🍼', title: 'Filhote Bem-Socializado', text: 'Entre 3 e 14 semanas, apresente o mundo com calma e petiscos: pessoas, sons, superfícies, manuseio.' },
    { id: 'c28', cat: 'Fases da vida', icon: '👵', title: 'Idoso com Carinho', text: 'Check-up semestral, camas macias, tapetes antiderrapantes e exercícios leves e regulares.' },
    { id: 'c29', cat: 'Fases da vida', icon: '🧠', title: 'Mente Ativa na Velhice', text: 'Rotina estável, jogos de faro e passeios curtos ajudam pets idosos a manter a mente ativa.' },
    { id: 'c30', cat: 'Vínculo', icon: '🏷️', title: 'Sempre Identificado', text: 'Plaquinha com telefone + microchip com dados atualizados. Em dias de fogos, mantenha portas e portões fechados.' }
  ];
  // Pergunta do "piscar lento" (c31) reaproveita um cartão de vínculo extra:
  cards.push({ id: 'c31', cat: 'Vínculo', icon: '😽', title: 'Piscar Lento', text: 'O piscar lento é um "eu confio em você" felino. Rotina, carinho respeitoso e brincadeira fortalecem o vínculo.' });
  // Mantemos 30 cartões no álbum principal + 1 cartão bônus (secreto).
  cards[cards.length - 1].bonus = true;

  /* ---------------------------------------------------------------
     DICAS PÓS-FASE
     --------------------------------------------------------------- */
  const tips = [
    'Mantenha vacinas e vermifugação em dia.',
    'Ofereça água fresca todos os dias.',
    'Observe mudanças de apetite, energia, peso ou comportamento.',
    'Brinquedos e desafios mentais ajudam a prevenir tédio e ansiedade.',
    'Check-ups preventivos ajudam a identificar problemas cedo.',
    'Escove pelos e dentes regularmente: é carinho e prevenção ao mesmo tempo.',
    'Petiscos com moderação: no máximo 10% das calorias do dia.',
    'Passeie nos horários frescos e teste o asfalto com a mão.',
    'Pets idosos merecem check-ups mais frequentes e camas confortáveis.',
    'Nunca dê remédios humanos ao seu pet sem orientação.'
  ];
  const disclaimer = 'O jogo orienta, mas não substitui a orientação do médico-veterinário.';

  /* ---------------------------------------------------------------
     ITENS
     consumables: encontrados em baús, usados durante a fase (máx. 3 de cada)
     relics: melhorias permanentes compradas com Patinhas do Saber
     --------------------------------------------------------------- */
  const consumables = {
    kit:    { name: 'Kit Primeiros Socorros', icon: '🧰', desc: 'Restaura toda a vida das torres e remove congelamentos.' },
    racao:  { name: 'Ração Energética', icon: '🍖', desc: '+40 de energia para os heróis.' },
    apito:  { name: 'Apito de Reunião', icon: '📯', desc: 'Atordoa todos os inimigos por 2.5s.' }
  };
  const relics = [
    { id: 'coleira',  name: 'Coleira da Coragem', icon: '🦮', price: 40,  desc: '+5% de dano em todas as torres.', effect: { dmg: 0.05 } },
    { id: 'cofrinho', name: 'Cofrinho de Osso',    icon: '🐷', price: 40,  desc: '+40 Moedas de Cuidado no início de cada fase.', effect: { startCoins: 40 } },
    { id: 'manta',    name: 'Manta Quentinha',     icon: '🧣', price: 50,  desc: '+3 vidas no Santuário.', effect: { lives: 3 } },
    { id: 'apostila', name: 'Apostila do Tutor',   icon: '📘', price: 60,  desc: 'Perguntas corretas dão +50% de recompensa.', effect: { quizMult: 0.5 } },
    { id: 'petiscos', name: 'Bolsinha de Petiscos', icon: '👝', price: 70, desc: 'Habilidades dos heróis recarregam 15% mais rápido.', effect: { cd: 0.15 } },
    { id: 'lupa',     name: 'Lupa do Detetive',    icon: '🔍', price: 80,  desc: 'Todas as torres revelam ocultos a até 1 casa.', effect: { reveal: 1 } },
    { id: 'mochila',  name: 'Mochila de Viagem',   icon: '🎒', price: 90,  desc: 'Começa cada fase com 1 Kit e 1 Apito.', effect: { startItems: true } },
    { id: 'estrela',  name: 'Estrela do Reino',    icon: '⭐', price: 120, desc: 'Venda de torres devolve 85% (em vez de 70%).', effect: { refund: 0.15 } }
  ];

  /* ---------------------------------------------------------------
     COSMÉTICOS (sem vantagem de jogo)
     --------------------------------------------------------------- */
  const cosmetics = [
    { id: 'none',     name: 'Clássico',          icon: '🐾', price: 0 },
    { id: 'capa',     name: 'Capa de Herói',     icon: '🦸', price: 30 },
    { id: 'chapeu',   name: 'Chapéu de Explorador', icon: '🤠', price: 30 },
    { id: 'coroa',    name: 'Coroa do Reino',    icon: '👑', price: 60 },
    { id: 'lenco',    name: 'Lencinho Florido',  icon: '🌸', price: 25 },
    { id: 'oculos',   name: 'Óculos de Estudo',  icon: '🤓', price: 40 }
  ];

  /* ---------------------------------------------------------------
     CONQUISTAS
     --------------------------------------------------------------- */
  const achievements = [
    { id: 'firstWin',   icon: '🏆', name: 'Primeira Defesa',     desc: 'Vença sua primeira fase.' },
    { id: 'perfect',    icon: '💎', name: 'Santuário Intocado',  desc: 'Vença uma fase sem perder vidas.' },
    { id: 'quiz10',     icon: '📚', name: 'Tutor Curioso',       desc: 'Acerte 10 perguntas.' },
    { id: 'quiz40',     icon: '🎓', name: 'Tutor Sábio',         desc: 'Acerte 40 perguntas.' },
    { id: 'cards15',    icon: '🃏', name: 'Colecionador',        desc: 'Desbloqueie 15 cartões.' },
    { id: 'cardsAll',   icon: '📖', name: 'Enciclopédia Pet',    desc: 'Desbloqueie os 30 cartões do álbum.' },
    { id: 'harmony',    icon: '🌈', name: 'Harmonia do Reino',   desc: 'Ative a combinação dos 4 heróis.' },
    { id: 'lvl5',       icon: '🌟', name: 'Evolução Máxima',     desc: 'Leve uma torre ao nível 5.' },
    { id: 'synergy4',   icon: '🔗', name: 'Mestre das Sinergias', desc: 'Tenha 4 sinergias ativas ao mesmo tempo.' },
    { id: 'allTowers',  icon: '🏰', name: 'Arquiteto do Reino',  desc: 'Construa os 12 tipos de torre.' },
    { id: 'vazio',      icon: '🕊️', name: 'Luz Contra o Vazio',  desc: 'Derrote O Vazio.' },
    { id: 'daily',      icon: '📅', name: 'Cuidado Diário',      desc: 'Complete um Desafio Diário.' },
    { id: 'streak3',    icon: '🔥', name: 'Hábito Formado',      desc: 'Jogue o Desafio Diário 3 dias seguidos.' },
    { id: 'clinic20',   icon: '🏥', name: 'Plantão da Clínica',  desc: 'Responda 20 perguntas na Clínica do Conhecimento.' }
  ];

  /* ---------------------------------------------------------------
     MODIFICADORES DO DESAFIO DIÁRIO / SEMANAL
     --------------------------------------------------------------- */
  const modifiers = [
    { id: 'pulgas',   name: 'Infestação!',        desc: 'Pulgas em dobro em todas as ondas.' },
    { id: 'suporte',  name: 'Clínica Solidária',  desc: 'Torres de suporte (Veterinária, Coração, Relógio) custam −30%.' },
    { id: 'fragil',   name: 'Santuário Frágil',   desc: 'Apenas 10 vidas, mas +50% de Patinhas.' },
    { id: 'rico',     name: 'Feira de Adoção',    desc: '+150 moedas iniciais, inimigos +15% de vida.' },
    { id: 'herois',   name: 'Heróis Animados',    desc: 'Habilidades com recarga −40%.' },
    { id: 'voadores', name: 'Céu Agitado',        desc: 'Ondas extras de inimigos voadores.' },
    { id: 'quiz',     name: 'Dia do Conhecimento', desc: 'Pergunta antes de TODA onda, recompensa dobrada.' }
  ];

  return { towers, LEVEL_SCALE, enemies, bosses, heroes, combos, synergies, weather, worlds, choices,
           questions, cards, tips, disclaimer, consumables, relics, cosmetics, achievements, modifiers };
})();
